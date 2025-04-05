import React from "react";
import { Link } from "react-router-dom";
import "../styles/About.css";

function About() {
  return (
    <div className="about-page">
      <div className="container">
        <h1 className="page-title">About API Documentation Generator</h1>

        <div className="about-content">
          <section className="about-section">
            <h2>What is API Documentation Generator?</h2>
            <p>
              API Documentation Generator is a powerful tool that leverages
              artificial intelligence to automatically generate beautiful,
              interactive documentation for your APIs. Simply upload your code
              files, and our advanced AI will analyze them to extract API
              endpoints, parameters, request/response formats, and more.
            </p>
            <p>
              Our mission is to simplify the documentation process, saving
              developers valuable time while ensuring APIs are well-documented
              and accessible.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Technology</h2>
            <p>
              We leverage Google's Gemini AI to analyze your code and extract
              API information with remarkable accuracy. The AI model has been
              trained on millions of code samples and can understand the
              structure and patterns of various API implementations across
              different programming languages and frameworks.
            </p>
            <p>
              Our backend is built with FastAPI, providing blazing fast
              performance with minimal latency, while the frontend is developed
              with React to deliver a smooth, responsive user experience.
            </p>
          </section>

          <section className="about-section tech-stack">
            <h2>Technology Stack</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <i className="fab fa-python"></i>
                <span>Python</span>
              </div>
              <div className="tech-item">
                <i className="fas fa-bolt"></i>
                <span>FastAPI</span>
              </div>
              <div className="tech-item">
                <i className="fab fa-react"></i>
                <span>React</span>
              </div>
              <div className="tech-item">
                <i className="fas fa-robot"></i>
                <span>Gemini AI</span>
              </div>
              <div className="tech-item">
                <i className="fab fa-html5"></i>
                <span>HTML5</span>
              </div>
              <div className="tech-item">
                <i className="fab fa-css3-alt"></i>
                <span>CSS3</span>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Upload Your Code</h3>
                  <p>
                    Upload your API code files with a simple drag and drop
                    interface. We support multiple programming languages
                    including Python, JavaScript, Java, Go, Ruby, PHP, and
                    TypeScript.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>AI Analysis</h3>
                  <p>
                    Our AI engine analyzes your code, identifying API endpoints,
                    parameters, request/response formats, and other critical
                    information with high precision.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Generate Documentation</h3>
                  <p>
                    The system generates comprehensive API documentation in both
                    interactive HTML and structured JSON formats, ready for
                    integration with your existing documentation systems.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Download & Use</h3>
                  <p>
                    Download your documentation package in seconds. The HTML
                    version can be deployed directly to your website, while the
                    JSON can be used for further processing or integration with
                    other tools.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Get Started</h2>
            <p>
              Ready to transform your API code into beautiful, interactive
              documentation? Try our tool today and see the difference it makes
              in your development workflow!
            </p>
            <div className="cta-buttons">
              <Link to="/generate" className="btn btn-primary">
                Generate Documentation
              </Link>
              <a
                href="https://github.com/dixisouls/api-docs-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <i className="fab fa-github"></i>
                View on GitHub
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
