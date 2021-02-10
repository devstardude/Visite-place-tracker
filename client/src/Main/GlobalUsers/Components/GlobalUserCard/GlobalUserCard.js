import React from "react";

import'./GlobalUserCard.css';

const GlobalUserCard = (props) => {
  return (
    <div className="container GlobalUserCard p-3 m-4 mx-auto">
      <div className="row">
        <div className="col-4">
          <div className="d-inline-block">
            <img
              className=" GlobalAvatar"
              src="https://lh3.googleusercontent.com/a-/AOh14GhdjLQbJ3MbF_f1xTIU9oz_7_arV-yGFmFun5kT=s96-c"
              alt="Dp.jpg"
            />
          </div>
        </div>
        <div className="col-8">
          <div className="GlobalDetailsDiv p-2">
            <h3 className="m-0 pb-1 GlobalName">Arun Shekhar</h3>
            <p className="m-0 pb-1 GlobalDesc">
              Just a guy who's a hero for fun ! I Never lose ! and surface
              world...is guarded by me !!
            </p>
          </div>
          <div>{/* <h5 className="ml-auto" >Journey</h5> */}</div>
        </div>
      </div>
    </div>
  );
};

export default GlobalUserCard;
