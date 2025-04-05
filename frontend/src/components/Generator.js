import React, { useState, useRef } from "react";
import "../styles/Generator.css";

function Generator() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file first");
      return;
    }

    setIsUploading(true);
    setError(null);
    setDownloadUrl(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/generate`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error generating documentation");
      }

      // Create a download URL
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to generate documentation");
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setError(null);
    setDownloadUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="generator-page">
      <div className="container">
        <h1 className="page-title">Generate API Documentation</h1>

        <div className="generator-container">
          <form onSubmit={handleSubmit} className="generator-form">
            <div
              className={`file-drop-area ${file ? "has-file" : ""}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="code-file"
                ref={fileInputRef}
                className="file-input"
                onChange={handleFileChange}
                accept=".py,.js,.java,.go,.rb,.php,.ts"
              />
              <label htmlFor="code-file" className="file-label">
                <i className="fas fa-upload"></i>
                <span>
                  {file ? file.name : "Drop your file here or click to browse"}
                </span>
              </label>

              <div className="file-info">
                {file && (
                  <div className="selected-file">
                    <p>
                      <strong>File:</strong> {file.name}
                    </p>
                    <p>
                      <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
                    </p>
                    <p>
                      <strong>Type:</strong> {file.type || "Unknown"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {file && !downloadUrl && !isUploading && (
              <button type="submit" className="btn btn-generate">
                Generate Documentation
              </button>
            )}

            {file && !isUploading && (
              <button
                type="button"
                className="btn btn-reset"
                onClick={handleReset}
              >
                Reset
              </button>
            )}
          </form>

          {isUploading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p className="loading-text">Generating documentation...</p>
              <p className="loading-subtext">This may take a few moments</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              <p>{error}</p>
            </div>
          )}

          {downloadUrl && (
            <div className="success-message">
              <div className="success-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3>Documentation Generated!</h3>
              <p>Your API documentation has been successfully generated.</p>

              <a
                href={downloadUrl}
                download="api-documentation.zip"
                className="btn btn-download"
              >
                <i className="fas fa-download"></i>
                Download Documentation
              </a>

              <p className="download-info">
                The zip file contains both HTML and JSON formats of your API
                documentation.
              </p>

              <button className="btn btn-generate-new" onClick={handleReset}>
                Generate Another
              </button>
            </div>
          )}
        </div>

        <div className="supported-files-info">
          <h3>Supported File Types</h3>
          <div className="file-types">
            <div className="file-type">
              <i className="fab fa-python"></i> Python
            </div>
            <div className="file-type">
              <i className="fab fa-js"></i> JavaScript
            </div>
            <div className="file-type">
              <i className="fab fa-java"></i> Java
            </div>
            <div className="file-type">
              <i className="fas fa-code"></i> Go
            </div>
            <div className="file-type">
              <i className="fas fa-gem"></i> Ruby
            </div>
            <div className="file-type">
              <i className="fab fa-php"></i> PHP
            </div>
            <div className="file-type">
              <i className="fab fa-react"></i> TypeScript
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Generator;
