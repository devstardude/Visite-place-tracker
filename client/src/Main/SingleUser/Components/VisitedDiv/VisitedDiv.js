import React from "react";
import PlaceCard from "../PlaceCard/PlaceCard";

// import "./VisitedDiv.css";

const PlaceDiv = (props) => {
  return (
    <div className="container-fluid ">
      <div className="row ">
        {props.visitedList &&
          props.visitedList.map((place) => (
            <div className="col-12 col-lg-6 pr-4 px-lg-5 pb-5 pt-3">
              <PlaceCard place={place} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlaceDiv;
