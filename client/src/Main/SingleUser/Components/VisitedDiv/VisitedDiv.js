import React from "react";
import Spinner from "../../../../Shared/Spinner/Spinner";
import PlaceCard from "../PlaceCard/PlaceCard";

// import "./VisitedDiv.css";

const VisitedDiv = (props) => {
  if (props.loading) {
    return <Spinner  />
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
            <div className="col-12 col-md-6 px-1 px-md-5 pt-3 pb-4">
              <PlaceCard key={place.id} place={place} {...props} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default VisitedDiv;
