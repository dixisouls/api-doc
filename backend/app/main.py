from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import os
import tempfile
import shutil
from app.services.generator import generate_documentation
from app.services.file_service import create_zip_file
from pathlib import Path

# Get port from environment variable (for Heroku compatibility)
PORT = int(os.getenv("PORT", 8000))

app = FastAPI(
    title="API Documentation Generator",
    description="Generate beautiful API documentation from your code files",
    version="1.0.0"
)

# Configure CORS - updated for Heroku
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, you might want to limit this
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

@app.get("/api")
async def root():
    """Root API endpoint"""
    return {"message": "API Documentation Generator API is running"}

@app.post("/api/generate")
async def generate_api_docs(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...)
):
    """
    Generate API documentation from uploaded file
    
    The file will be processed using the Gemini API to extract API endpoints
    and returned as a downloadable zip containing JSON and HTML documentation.
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
            filename="api-documentation.zip"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Check if we're running in production (Heroku)
if os.getenv("ENVIRONMENT", "development") == "production":
    # Serve static files from the frontend build directory
    app.mount("/", StaticFiles(directory="frontend/build", html=True), name="static")
    
    # To avoid 404 on page refresh for client-side routing
    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_frontend(full_path: str):
        frontend_path = Path("frontend/build/index.html")
        if frontend_path.exists():
            with open(frontend_path) as f:
                return HTMLResponse(content=f.read())
        return {"message": "Frontend not found"}