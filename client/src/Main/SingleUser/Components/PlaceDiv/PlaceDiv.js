import React from "react";
import PlaceCard from "../PlaceCard/PlaceCard";

// import "./PlaceDiv.css";

const PlaceDiv = (props) => {
  return (
    <div className="container-fluid">
      <div className="row px-0">
        <div className="col-12 col-lg-6 pr-4 px-lg-5 pb-5 pt-3">
          <PlaceCard />
        </div>
        <div className="col-12 col-lg-6 pr-4 px-lg-5 pb-5 pt-3">
          <PlaceCard />
        </div>
        <div className="col-12 col-lg-6 pr-4 px-lg-5 pb-5 pt-3">
          <PlaceCard />
        </div>
        <div className="col-12 col-lg-6 pr-4 px-lg-5 pb-5 pt-3">
          <PlaceCard />
        </div>
        <div className="col-12 col-lg-6 pr-4 px-lg-5 pb-5 pt-3">
          <PlaceCard />
        </div>
      </div>
    </div>
  );
};

export default PlaceDiv;
