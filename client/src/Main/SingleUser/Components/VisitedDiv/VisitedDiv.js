import React from "react";
import Spinner from "../../../../Shared/Spinner/Spinner";
import PlaceCard from "../PlaceCard/PlaceCard";

// import "./VisitedDiv.css";

const VisitedDiv = (props) => {
  
  return (
    <React.Fragment>
      {props.loading && <Spinner />}
      {!props.loading && props.visitedList && (
        <div className="container-fluid">
          <div className="row ">
            {props.visitedList.map((place) => (
              <div className="col-12 col-lg-6 pr-4 px-lg-5 pb-5 pt-3">
                <PlaceCard key={place.id} place={place} {...props} />
              </div>
            ))}
          </div>
        </div>
      )}
      {!props.loading && props.visitedList && props.visitedList.length === 0 && (
        <div className="container Center pt-4">
          <h4 style={{ color: "#ffffff" }}>No Places to show</h4>
        </div>
      )}
      {!props.loading && !props.visitedList && (
        <div className="container Center pt-4">
          <h4 style={{ color: "#ffffff" }}>Loading...</h4>
        </div>
      )}
    </React.Fragment>
  );
};

export default VisitedDiv;
