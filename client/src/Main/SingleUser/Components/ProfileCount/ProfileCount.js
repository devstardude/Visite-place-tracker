import React from "react";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import EcoIcon from "@material-ui/icons/Eco";
import PublicIcon from "@material-ui/icons/Public";
import WavesIcon from "@material-ui/icons/Waves";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import MapIcon from "@material-ui/icons/Map";
import'./ProfileCount.css';

const ProfileCount = (props) => {
  return (
    <div className="container Center ProfileInfo mt-4 mb-0 mb-md-0">
      <div className="row Center mt-2 py-3 ">
        <h3 className="mb-4 ">Profile Info</h3>
        <div className="col-3 p-0">
          <div>
            <EmojiTransportationIcon />
          </div>
          <p className="d-inline CountText">Urban - 12</p>
        </div>
        <div className="col-3 p-0">
          <div>
            <EcoIcon />
          </div>
          <p className="d-inline CountText">Nature - 12</p>
        </div>
        <div className="col-3 p-0">
          <div>
            <WavesIcon />
          </div>
          <p className="d-inline CountText">Sea - 12</p>
        </div>
        <div className="col-3 p-0">
          <div>
            <PublicIcon />
          </div>
          <p className="d-inline CountText">Others - 12</p>
        </div>
      </div>
      <div className="row Center mt-4 pb-4 ">
        <div className="col-4 p-0">
          <div>
            <MapIcon />
          </div>
          <p className="d-inline CountText">Total - 12</p>
        </div>
        <div className="col-4 p-0">
          <div>
            <FavoriteIcon />
          </div>
          <p className="d-inline CountText">Likes - 12</p>
        </div>
        <div className="col-4 p-0">
          <div>
            <FeaturedPlayListIcon />
          </div>
          <p className="d-inline CountText">Posts - 12</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCount;
