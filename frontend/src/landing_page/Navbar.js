import React from "react";
import { Link } from "react-router-dom";



function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="container p-1">
        <Link className="navbar-brand" to="/">
          <img src="images/logo.svg" alt="logo" style={{ width: "25%" }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex" role="search">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active text-muted" aria-current="page" to="/signup">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-muted" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-muted" to="/products">
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-muted" to="/pricing">
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-muted" to="/support">
                  Support
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active text-muted"
                  href="http://localhost:3001"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;