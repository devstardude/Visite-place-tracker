import React from "react";
import PlaceCard from "../PlaceCard/PlaceCard";
import Spinner from "../../../../Shared/Spinner/Spinner";

// import "./WishlistDiv.css";

const WishlistDiv = (props) => {
   if (props.loading) {
     return <Spinner />;
   }
    if (!props.wishlistList || props.wishlistList.length === 0) {
      return (
        <div className="container Center pt-4">
          <h4 style={{ color: "#ffffff" }}>No Places to show</h4>
        </div>
      );
    }
  return (
    <div className="container-fluid ">
      <div className="row ">
        {props.wishlistList &&
          props.wishlistList.map((place) => (
            <div key={place.id} className="col-12 col-lg-6 pr-4 px-lg-5 pb-5 pt-3">
              <PlaceCard place={place} {...props} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default WishlistDiv;
