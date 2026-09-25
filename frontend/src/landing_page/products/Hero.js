import React from "react";
function Hero() {
  return (
    <div className="container text-center mt-5 mb-5 border-bottom p-3">
      <h1>Technology</h1>
      <h3 className="text-muted mt-3">
        Sleek,modern and intuitive trading platforms
      </h3>
      <p className="text-muted mt-2 mb-5">
        Check out our{" "}
        <a href="hero" style={{ textDecoration: "none" }}>
          {" "}
          investment offerings
          <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
        </a>
      </p>
    </div>
  );
}

export default Hero;
