import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="px-2 pt-5 pb-3" id="supportWrapper">
        <h4>Support Portal</h4>
        <a href="" style={{ textDecoration: "underline" }}>Track Tickets</a>
      </div>

      <div className="row px-5 mb-5" style={{ margin: "0 50px" }}>
        <div className="col-5 p-4">
          <h1 className="fs-3 mb-4">
            Search for an answer or browse help topics to create a ticket
          </h1>
          <input
            placeholder="Eg: how do i activate F&O, why is my order getting rejected.."
            className="mb-4"
          />
          <div className="d-flex flex-wrap gap-3 mb-5">
            <a href="" style={{ textDecoration: "underline" }}>Track Segment activation</a>
            <a href="" style={{ textDecoration: "underline" }}>Track Account Opening</a>
            <a href="" style={{ textDecoration: "underline" }}>Intraday Margins</a>
            <a href="" style={{ textDecoration: "underline" }}>Kite User Manuals</a>
          </div>
        </div>
        <div className="col-5 offset-2 p-4">
          <h1 className="fs-3 mb-4">Featured</h1>
          <ol style={{ lineHeight: "2.2" }}>
            <li>
              <a href="" style={{ textDecoration: "none" }}>Current Takeovers and Delisting - January 2024</a>
            </li>
            <li>
              <a href="" style={{ textDecoration: "none" }}>Latest Intraday leverages - MIS & CO</a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;