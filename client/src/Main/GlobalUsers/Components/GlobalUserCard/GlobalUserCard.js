import React from "react";

import "./GlobalUserCard.css";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import EcoIcon from "@material-ui/icons/Eco";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import WavesIcon from "@material-ui/icons/Waves";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import StarIcon from "@material-ui/icons/Star";

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
          <div className="GlobalDetailsDiv RoundAndDark p-2">
            <h3 className="m-0 pb-1 GlobalName">Arun Shekhar</h3>
            <p className="m-0 pb-1 GlobalDesc">
              Just a guy who's a hero for fun ! I Never lose ! and surface
              world...is guarded by me !!
            </p>
          </div>
        </div>
        <div className="col-12">
          <div className="RoundAndDark text-center mt-3 mb-2 p-2">
            <div className="d-inline mx-1 mx-md-2">
              <EmojiTransportationIcon />
              <div className="GlobalPlaceCount rounded-circle border border-light mx-1 p-1 ">
                00
              </div>
            </div>
            <div className="d-inline mx-1 mx-md-2">
              <EcoIcon />
              <div className="GlobalPlaceCount rounded-circle border border-light mx-1 p-1 ">
                00
              </div>
            </div>
            <div className="d-inline mx-1 mx-md-2">
              <WavesIcon />
              <div className="GlobalPlaceCount rounded-circle border border-light mx-1 p-1 ">
                00
              </div>
            </div>
            <div className="d-inline mx-1 mx-md-2">
              <InsertEmoticonIcon style={{ fontSize: "27px" }} />
              <div className="GlobalPlaceCount rounded-circle border border-light mx-1 p-1 ">
                00
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 mt-1">
          <div className="d-flex justify-content-between">
            <div className="RoundAndDark py-1 px-2">
              <FavoriteIcon fontSize="small" style={{ color: "#ffffffbd" }} />{" "}
              <p className="d-inline">2</p>
            </div>
            <div className="RoundAndDark py-1 px-2">
              <StarIcon fontSize="small" style={{ color: "#ffffffbd" }} />
              <p className="d-inline mx-2">Pro Traveller</p>
              <StarIcon fontSize="small" style={{ color: "#ffffffbd" }} />
            </div>
            <div className="RoundAndDark py-1 px-2">
              <FeaturedPlayListIcon
                fontSize="small"
                style={{ color: "#ffffffbd" }}
              />{" "}
              <p className="d-inline">2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalUserCard;
