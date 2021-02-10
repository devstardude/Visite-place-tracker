import React from "react";
import ExploreIcon from "@material-ui/icons/Explore";
import { Zoom,Fade } from "@material-ui/core";
import Fog from "../../../../assets/images/fog.png"
import "./Header.css";

const Header = (props) => {
  return (
    <React.Fragment>
      <div className="LandingBanner">
        <div className="container Center LandingTitleBox">
          <div className="row">
            <div className="col-12">
              <h1 className="LandingTitle m-0">Visité</h1>
            </div>
            <div className="col-12">
              <h2 className="HeaderSubtitle pt-1">
                <Fade className="d-inline" in timeout={1600} >
                  <h2>The Journey of your Soul</h2>
                </Fade>{" "}
                <Zoom in={true} timeout={2200}>
                  <ExploreIcon className="ExploreIcon" />
                </Zoom>
                <div>
                  <img className="Fog " src={Fog} alt="..." />
                  <img className="Fog Right" src={Fog} alt="..." />
                </div>
              </h2>
            </div>
          </div>
        </div>
        <div className="moving-clouds"></div>
      </div>
    </React.Fragment>
  );
};

export default Header;
