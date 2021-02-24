import React from "react";
import { Link } from "react-router-dom";
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
              src={props.user.dp}
            />
          </div>
          {console.log(props.user.username)}
          <h2>{props.user.username}</h2>
          <p className="UserHeaderBio my-3 mx-auto">
            {props.user.bio}
          </p>
          {/* <button type="button" class="btn LikeProfileButton rounded-pill btn-outline-secondary my-2">
            🖤 Like Profile
          </button> */}
          <Link to="/add">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill"
            >
              ➕ Add
            </button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserHeader;
