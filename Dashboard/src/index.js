import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Intercept Token from URL
const urlParams = new URLSearchParams(window.location.search);
const urlToken = urlParams.get('token');
if(urlToken) {
  localStorage.setItem('token', urlToken);
  // Remove token from url for security
  window.history.replaceState({}, document.title, "/");
}

const token = localStorage.getItem('token');
if (!token) {
  // If no token exists, force redirect to Frontend Signup
  window.location.href = "http://localhost:3000/signup";
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
