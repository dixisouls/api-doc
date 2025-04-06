import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-wave"></div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <i className="fas fa-code"></i>
              <span>Forge API</span>
            </Link>
            <p className="footer-tagline">
              Transform your code into beautiful, interactive API documentation
              using the power of AI. Save time and create professional
              documentation that developers will love.
            </p>
          </div>

          <div className="footer-links-column">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/generate">Generate Docs</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h4>Resources</h4>
            <ul>
              <li>
                <a
                  href="https://github.com/dixisouls/api-doc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/dixisouls/api-doc/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Report an Issue
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/dixisouls/api-doc/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h4>Connect</h4>
            <ul className="social-links">
              <li>
                <a
                  href="https://github.com/dixisouls"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github"></i>
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://hub.docker.com/u/dixisouls"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-docker"></i>
                  <span>Docker Hub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://huggingface.co/dixisouls"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-robot"></i>
                  <span>Hugging Face</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} Forge API | Created with{" "}
            <i className="fas fa-heart" style={{ color: "#ff5722" }}></i> by
            <a
              href="https://divyapanchal.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Divya Panchal
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
