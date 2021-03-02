import React from "react";
import PlaceCard from "../PlaceCard/PlaceCard";

// import "./VisitedDiv.css";

const VisitedDiv = (props) => {
  return (
    <div className="container-fluid ">
      <div className="row ">
        {props.visitedList &&
          props.visitedList.map((place) => (
            <div className="col-12 col-lg-6 pr-4 px-lg-5 pb-5 pt-3">
              <PlaceCard key={place.id} place={place} {...props} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default VisitedDiv;
