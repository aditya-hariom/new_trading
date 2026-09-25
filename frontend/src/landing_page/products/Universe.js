import React from "react";
import { Link } from "react-router-dom";
function Universe(
  ) {
  return (
    <div className="container mb-5 ">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-5">
          <img src="images/smallcaseLogo.png" style={{ width: "150px", height: "auto" }} />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="images/streakLogo.png" style={{ width: "150px", height: "auto" }} />
          <p className="text-small text-muted">Algo & strategy platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src=" images\sensibullLogo.svg" style={{ width: "150px", height: "auto" }} />
          <p className="text-small text-muted">Options trading platform</p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img src="images\zerodhaFundhouse.png" style={{ width: "150px", height: "auto" }} />
          <p className="text-small text-muted">Asset management</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="images\goldenpiLogo.png" style={{ width: "150px", height: "auto" }} />
          <p className="text-small text-muted">Bonds trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="images\dittoLogo.png" style={{ width: "110px", height: "auto" }}/>
          <p className="text-small text-muted">Insurance</p>
          </div>
          <Link to="/signup" className= 'p-2 btn btn-primary fs-5 mb-5 mt-5' style={{width:"20%",margin:"0 auto"}}>Signup Now
                    </Link> 
      </div>
    </div>
  );
}

export default Universe;
