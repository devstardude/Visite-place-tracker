import React from "react";
import Spinner from "../../../../Shared/Spinner/Spinner";
import PlaceCard from "../PlaceCard/PlaceCard";

// import "./VisitedDiv.css";

const VisitedDiv = (props) => {
  if (props.loading) {
    return <Spinner />
  }
  if(!props.visitedList || props.visitedList.length===0){
    return (
      <div className="container Center pt-4">
        <h4 style={{color:"#ffffff"}}>
          No Places to show
        </h4>
      </div>
    );
  }
  return (
    <div className="container-fluid">
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
