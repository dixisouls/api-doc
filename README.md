# API Documentation Generator

An AI-powered tool to automatically generate beautiful, interactive API
documentation from your code files.

## Features

- Upload API code files in multiple languages
- AI-powered analysis using Google's Gemini API
- Generate interactive HTML documentation
- Get structured JSON data for custom integrations
- Modern, responsive UI with smooth animations
- Support for various programming languages

## Architecture

This project consists of two main components:

1. **Backend**: FastAPI application that handles file processing and AI analysis
2. **Frontend**: React application that provides a user-friendly interface

## Project Structure

```
api-docs-generator/
├── backend/               # FastAPI application
│   ├── app/
│   │   ├── main.py
│   │   ├── services/
│   │   │   ├── generator.py
│   │   │   └── file_service.py
│   │   └── templates/
│   │       └── api-docs-template.html
│   └── requirements.txt
├── frontend/              # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   └── services/
│   ├── package.json
│   └── .env
└── .gitignore
```

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn
- Google API key with access to Gemini AI

## Getting Started

### Setting up the Backend

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Create a virtual environment and activate it:

   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```
   pip install -r requirements.txt
   ```

4. Set environment variables:

   - Create a `.env` file in the backend directory
   - Add your Google API key and other environment variables (see
     `.env.example`)

5. Run the FastAPI server:
   ```
   uvicorn app.main:app --reload
   ```

### Setting up the Frontend

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set environment variables:

   - Create a `.env` file in the frontend directory
   - Set `REACT_APP_API_URL` to your backend URL (default:
     `http://localhost:8000`)

4. Run the development server:
   ```
   npm start
   ```

## Usage

1. Access the application at `http://localhost:3000`
2. Upload your API code file
3. The system will analyze your code and generate documentation
4. Download the documentation as a ZIP file containing:
   - Interactive HTML documentation
   - Structured JSON data

## Deployment

### Backend Deployment

The FastAPI backend can be deployed using various methods:

- Docker container
- Cloud platforms like AWS, GCP, or Azure
- PaaS services like Heroku or Railway

### Frontend Deployment

The React frontend can be deployed to:

- Static hosting services (Netlify, Vercel)
- AWS S3 + CloudFront
- GitHub Pages

## Technologies Used

- **Backend**:

  - Python
  - FastAPI
  - Google Generative AI (Gemini)
  - Jinja2 Templates

- **Frontend**:
  - React
  - React Router
  - CSS3 with custom animations
  - Font Awesome icons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for
details.

## Acknowledgements

- Google Generative AI for the powerful Gemini API
- FastAPI for the high-performance backend
- React for the responsive frontend

## Author

Created by [dixisouls](https://github.com/dixisouls)
