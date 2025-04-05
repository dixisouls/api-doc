import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";

function Landing() {
  return (
    <div className="landing">
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">API Documentation Generator</h1>
            <p className="hero-description">
              Transform your code into beautiful, interactive API documentation
              with AI.
            </p>
            <div className="hero-actions">
              <Link to="/generate" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="/images/api-docs-illustration.svg"
              alt="API Documentation Illustration"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/500x400?text=API+Documentation";
              }}
            />
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-upload"></i>
              </div>
              <h3 className="feature-title">Upload Your Code</h3>
              <p className="feature-description">
                Upload your API code files in any language. We support Python,
                JavaScript, Java, and more.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h3 className="feature-title">AI Processing</h3>
              <p className="feature-description">
                Our advanced AI analyzes your code to identify endpoints,
                parameters, and responses.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-file-code"></i>
              </div>
              <h3 className="feature-title">Get Documentation</h3>
              <p className="feature-description">
                Download beautiful, interactive documentation in HTML and JSON
                formats.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <h2 className="cta-title">
            Ready to generate your API documentation?
          </h2>
          <Link to="/generate" className="btn btn-cta">
            Generate Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
