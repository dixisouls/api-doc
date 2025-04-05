import os
import json
import aiohttp
from typing import Dict, Any
import asyncio
from google import genai
from google.genai import types
from dotenv import load_dotenv


async def generate_documentation(file_path: str) -> Dict[str, Any]:
    """
    Generate API documentation from a code file using Google's Gemini API

    Args:
        file_path: Path to the code file

    Returns:
        Dictionary containing the API documentation in JSON format
    """
    # Get API key from environment variables
    load_dotenv()
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("GOOGLE_API_KEY environment variable is not set")

    # Initialize Gemini client
    client = genai.Client(api_key=api_key)

    # Read file content
    with open(file_path, "r", encoding="utf-8") as f:
        file_content = f.read()

    # Configure the model
    model = "gemini-2.0-flash"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(
                    text="""You are an expert API documentation generator. Given the following file content, extract comprehensive API documentation. 
                The API documentation should be structured to clearly define each endpoint, its parameters, request body, responses, and any other relevant information.
                Pay close attention to details like data types, required fields, example values, and response codes.
                The documentation should be suitable for developers to understand and implement the API.
                
                If you don't find any relevant information in the code, just assume it or put a "-" dash.
                If any sub parts exist, then and only then give them. For example, if authentication exists, then only give authentication for that, else don't."""
                ),
            ],
        ),
        types.Content(
            role="model",
            parts=[
                types.Part.from_text(
                    text="""[
                  {
                    "Endpoint": "POST /api/v1/auth/register",
                    "Description": "Register a new user.",
                    "Parameters": [
                      {
                        "Name": "email",
                        "Type": "string",
                        "In": "body",
                        "Required": "Yes",
                        "Description": "User's email",
                        "Example Value": "user@example.com"
                      }
                    ],
                    "Request Body": {
                      "Content Type": "application/json",
                      "Schema": "{\n \"email\": \"string\"\n}",
                      "Example Value": "{\n \"email\": \"user@example.com\"\n}"
                    },
                    "Responses": [
                      {
                        "Code": "201",
                        "Description": "Successful Response",
                        "Media Type": "application/json",
                        "Schema": "-",
                        "Example Value": "{ \"email\": \"user@example.com\" }"
                      }
                    ],
                    "Authentication": "-",
                    "Other Details": "-",
                    "Links": "-"
                  }
                ]"""
                ),
            ],
        ),
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=file_content),
            ],
        ),
    ]

    # Configure response format
    generate_content_config = types.GenerateContentConfig(
        response_mime_type="application/json",
    )

    # Generate documentation using Gemini API
    try:
        response = client.models.generate_content(
            model=model,
            contents=contents,
            config=generate_content_config,
        )

        # Parse JSON response
        docs_json = json.loads(response.text)
        return docs_json

    except Exception as e:
        # Fallback to empty documentation if API fails
        print(f"Error generating documentation: {e}")
        return [
            {
                "Endpoint": "GET /",
                "Description": "Could not generate documentation. Error occurred during processing.",
                "Parameters": [],
                "Request Body": "-",
                "Responses": [
                    {
                        "Code": "200",
                        "Description": "Successful Response",
                        "Media Type": "application/json",
                        "Schema": "-",
                        "Example Value": "{}",
                    }
                ],
                "Authentication": "-",
                "Other Details": f"Error: {str(e)}",
                "Links": "-",
            }
        ]
