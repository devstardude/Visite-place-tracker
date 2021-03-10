import React from 'react';
import { Link } from 'react-router-dom';
import CoverPic from "../../assets/images/cover.jpg"
import Dp from "../../assets/images/dp.jpg"
import'./AboutMe.css';

const AboutMe = (props)=>{
    return (
      <React.Fragment>
        <div
          className="SingleUserCover"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${CoverPic})`,
          }}
        ></div>
        <div className="container">
          <div className="Owner ">
            <div className="Avatar ">
              <img
                alt="..."
                className="Img-circle Img-no-padding img-responsive"
                src={Dp}
              />
            </div>
            <h2>Arun Shekhar</h2>
            <p className="UserHeaderBio my-3 mx-auto">
              Just a guy who's a hero for fun
            </p>
            
          </div>
        </div>
      </React.Fragment>
    );
};

export default AboutMe ;