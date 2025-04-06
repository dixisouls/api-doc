from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import tempfile
import shutil
from app.services.generator import generate_documentation
from app.services.file_service import create_zip_file
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

def global_limiter_key(request: Request) -> str:
    return "global"  # Constant key for all requests

# Initialize rate limiter with global key function
limiter = Limiter(key_func=global_limiter_key)

app = FastAPI(
    title="API Documentation Generator",
    description="Generate beautiful API documentation from your code files",
    version="1.0.0",
)

# Add rate limit exceeded handler
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

origins = [
    "http://localhost:3000",           # Local development
    "https://forge-api-rose.vercel.app",  # Your actual Vercel app URL
]

# Configure CORS - updated for debugging
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Temporarily allow all origins for debugging
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create temp directory for files
temp_dir = tempfile.mkdtemp()


@app.on_event("shutdown")
async def cleanup():
    """Clean up temporary files on shutdown"""
    shutil.rmtree(temp_dir, ignore_errors=True)


@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "API Documentation Generator API is running"}


@app.post("/api/generate")
@limiter.limit("10/minute;1000/day")  # Apply GLOBAL rate limits: 10 per minute, 1000 per day
async def generate_api_docs(
    request: Request,  # Required for rate limiting
    background_tasks: BackgroundTasks, 
    file: UploadFile = File(...)
):
    """
    Generate API documentation from uploaded file

    The file will be processed using the Gemini API to extract API endpoints
    and returned as a downloadable zip containing JSON and HTML documentation.
    
    Rate limits: 10 requests per minute, 1000 requests per day GLOBALLY across all clients.
    """
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")

    # Save uploaded file to temp directory
    file_path = os.path.join(temp_dir, file.filename)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Generate documentation
        json_data = await generate_documentation(file_path)

        # Create zip file with documentation
        zip_path = await create_zip_file(json_data, temp_dir)

        # Add cleanup task
        background_tasks.add_task(os.remove, file_path)
        background_tasks.add_task(os.remove, zip_path)

        # Return the zip file
        return FileResponse(
            path=zip_path,
            media_type="application/zip",
            filename="api-documentation.zip",
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))