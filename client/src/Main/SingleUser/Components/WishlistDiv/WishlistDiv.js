import React from "react";
import PlaceCard from "../PlaceCard/PlaceCard";
import Spinner from "../../../../Shared/Spinner/Spinner";

// import "./WishlistDiv.css";

const WishlistDiv = (props) => {
   return (
     <React.Fragment>
       {props.loading && <Spinner />}
       {!props.loading && props.wishlistList && (
         <div className="container-fluid">
           <div className="row ">
             {props.wishlistList.map((place) => (
               <div className="col-12 col-lg-6 pr-4 px-lg-5 pb-5 pt-3">
                 <PlaceCard key={place.id} place={place} {...props} />
               </div>
             ))}
           </div>
         </div>
       )}
       {!props.loading &&
         props.wishlistList &&
         props.wishlistList.length === 0 && (
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

export default WishlistDiv;
