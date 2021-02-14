import React from "react";
import CoverPic from "../../../../assets/images/cover.jpg";
import Dp from "../../../../assets/images/dp.jpg";
import "./UserHeader.css";

const UserHeader = (props) => {
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
            Just a Guy whos a hero for fun,I never Lose, and the Surface world
            is guarded by me !Just a Guy whos a hero for fun,I never Lose, and
            the Surface world is guarded by me{" "}
          </p>
          <button type="button" class="btn LikeProfileButton rounded-pill btn-outline-secondary my-2">
            🖤 Like Profile
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserHeader;
