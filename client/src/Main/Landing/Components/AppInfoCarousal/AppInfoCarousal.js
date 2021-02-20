import React from "react";
import Image from "../../../../assets/images/user-bg.jpg";
import Image2 from "../../../../assets/images/cover.jpg";
import Image3 from "../../../../assets/images/traveller.jpg";

import "./AppInfoCarousal.css";

const AppInfoCarousal = (props) => {
  return (
    <div>
      <div
        id="carousal"
        className="carousel carousel-fade"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carousal"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carousal" data-slide-to="1"></li>
          <li data-target="#carousal" data-slide-to="2"></li>
          <li data-target="#carousal" data-slide-to="3"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={Image} alt="First slide" />
            <div className="carousel-caption d-md-block">
              <h5>Share Place</h5>
              <p>Shared Places will be visible to everyone</p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={Image2} alt="Second slide" />
            <div className="carousel-caption d-md-block">
              <h5>Wishlist Place</h5>
              <p>Only you can see Wishlist Places </p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={Image3} alt="Third slide" />
            <div className="carousel-caption d-md-block">
              <h5>Share Post</h5>
              <p>Share Recommandations or Experience by writing a Blog post</p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={Image3} alt="Third slide" />
            <div className="carousel-caption  d-md-block">
              <h5>Send Message</h5>
              <p>Send personal message to profile you like</p>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carousal"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only"></span>
        </a>
        <a
          className="carousel-control-next"
          href="#carousal"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only"></span>
        </a>
      </div>
    </div>
  );
};

export default AppInfoCarousal;
