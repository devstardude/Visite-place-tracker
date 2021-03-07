import React from "react";
import CoverPic from "../../assets/images/banner.jpg";
import "./Masthead.css";

const Masthead = (props) => {
  return (
    <div
      className="MastheadCover"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${props.cover ? props.cover : CoverPic})`,
      }}
    >
      <div className="my-auto Center">
        <h1>{props.title}</h1>
      </div>
    </div>
  );
};

export default Masthead;
