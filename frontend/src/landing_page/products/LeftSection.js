import React from "react";
function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mb-5 ">
      <div className="row ">
        <div className="col-6 ">
          <img src={imageURL}  />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <div>
            <a href={tryDemo} target="_blank" rel="noopener noreferrer">
              Try Demo <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
            <a href={learnMore} style={{ marginLeft: "50px" }}>
              Learn More <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
          <div className="mt-2">
            <a href={googlePlay}>
              <img src="images/googlePlayBadge.svg"></img>
            </a>
            <a href={appStore}>
              <img src="images/appstoreBadge.svg"></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
