import React from 'react';
import CoverPic from "../../../../assets/images/cover.jpg"
import Dp from "../../../../assets/images/dp.jpg"
import'./UserHeader.css';

const UserHeader = (props)=>{
    return (
      <React.Fragment>
        <div
          className="SingleUserCover"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${CoverPic})`,
          }}
        >
          <div className="filter"></div>
        </div>
        <div className="container">
          <div className="owner ">
            <div className="avatar ">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={Dp}
              />
            </div>
            <h2>Name</h2>
            <p className="w-75 mx-auto">Just a Guy whos a hero for fun</p>
            <button
              type="button"
              class="btn rounded-pill btn-outline-secondary"
            >
              Secondary
            </button>
          </div>
        </div>
      </React.Fragment>
    );
};

export default UserHeader ;