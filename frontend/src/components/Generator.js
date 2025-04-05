import React, { useState, useRef, useEffect } from "react";
import "../styles/Generator.css";

function Generator() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

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

  const simulateProgress = () => {
    setProgress(0);
    // Simulate progress until we reach 90%
    progressIntervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 5;
        if (newProgress >= 90) {
          clearInterval(progressIntervalRef.current);
          return 90;
        }
        return newProgress;
      });
    }, 300);
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
    simulateProgress();

    const formData = new FormData();
    formData.append("file", file);

    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "/api/generate" // In production, use relative path
        : `${
            process.env.REACT_APP_API_URL || "http://localhost:8000"
          }/api/generate`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error generating documentation");
      }

      // Complete the progress to 100%
      setProgress(100);
      clearInterval(progressIntervalRef.current);

      // Short delay before showing success to allow progress animation to complete
      setTimeout(() => {
        // Create a download URL using promises instead of await
        const getBlobFromResponse = () => {
          if (response.blob) {
            return response.blob();
          } else {
            return response.arrayBuffer().then((buffer) => new Blob([buffer]));
          }
        };

        getBlobFromResponse().then((blob) => {
          const url = window.URL.createObjectURL(blob);
          setDownloadUrl(url);
          setIsUploading(false);
        });
      }, 500);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to generate documentation");
      setIsUploading(false);
      clearInterval(progressIntervalRef.current);
    }
  };

  const handleReset = () => {
    setFile(null);
    setError(null);
    setDownloadUrl(null);
    setProgress(0);
    clearInterval(progressIntervalRef.current);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileIcon = () => {
    if (!file) return "fas fa-upload";

    const extension = file.name.split(".").pop().toLowerCase();

    switch (extension) {
      case "py":
        return "fab fa-python";
      case "js":
      case "jsx":
        return "fab fa-js";
      case "java":
        return "fab fa-java";
      case "go":
        return "fas fa-code";
      case "rb":
        return "fas fa-gem";
      case "php":
        return "fab fa-php";
      case "ts":
      case "tsx":
        return "fab fa-react";
      default:
        return "fas fa-file-code";
    }
  };

  return (
    <div className="generator-page">
      <div className="container">
        <h1 className="page-title">Generate API Documentation</h1>

        <div className="generator-container">
          {!isUploading && !downloadUrl && (
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
                  accept=".py,.js,.java,.go,.rb,.php,.ts,.jsx,.tsx"
                />
                <label htmlFor="code-file" className="file-label">
                  <i className={getFileIcon()}></i>
                  <span>
                    {file
                      ? `${file.name} selected`
                      : "Drop your file here or click to browse"}
                  </span>
                </label>

                <div className="file-info">
                  {file && (
                    <div className="selected-file">
                      <p>
                        <strong>File:</strong> {file.name}
                      </p>
                      <p>
                        <strong>Size:</strong> {(file.size / 1024).toFixed(2)}{" "}
                        KB
                      </p>
                      <p>
                        <strong>Type:</strong> {file.type || "Code file"}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {file && !downloadUrl && !isUploading && (
                <button type="submit" className="btn btn-generate">
                  <i className="fas fa-magic mr-2"></i> Generate Documentation
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
          )}

          {isUploading && (
            <div className="loading-container">
              <div className="loading-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p className="loading-text">Generating documentation...</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="loading-subtext">
                Our AI is analyzing your code to extract API endpoints,
                parameters, and response formats. This may take a moment.
              </p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              <div>
                <p>
                  <strong>Error:</strong>
                </p>
                <p>{error}</p>
              </div>
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
                <i className="fas fa-info-circle"></i> The zip file contains
                both HTML and JSON formats of your API documentation. You can
                host the HTML file directly or use the JSON data for further
                integration.
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
