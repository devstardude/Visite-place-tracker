import React from "react";

import "./GlobalUserCard.css";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import EcoIcon from "@material-ui/icons/Eco";
import PublicIcon from "@material-ui/icons/Public";
import WavesIcon from "@material-ui/icons/Waves";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import StarIcon from "@material-ui/icons/Star";
import TooltipInfo from "../../../../Shared/TooltipInfo/TooltipInfo";
import badge from "../../../../utils/badge";
const GlobalUserCard = (props) => {
  const badgeText = badge(
    props.users.placesCount[0],
    props.users.placesCount[1],
    props.users.placesCount[2],
    props.users.placesCount[3]
  );
  return (
    <div className="container GlobalUserCard p-3 m-0 m-md-4 mx-auto">
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
            <h3 className="m-0 pb-1 GlobalName">{props.users.name}</h3>
            {/* Name Limit is 12 */}
            <p className="m-0 pb-1 GlobalDesc">
              {props.users.desc.slice(0, 75)}{" "}
              {props.users.desc.slice(76, 77) && "... (Read More)"}
            </p>
          </div>
        </div>
        <div className="col-12">
          <div className="RoundAndDark text-center mt-3 mb-2 p-2">
            <TooltipInfo info="Urban">
              <div className="d-inline mx-1 mx-md-2">
                <EmojiTransportationIcon />
                <div className="GlobalPlaceCount rounded-circle border border-light mx-1 p-1 ">
                  {props.users.placesCount[0]}
                </div>
              </div>
            </TooltipInfo>
            <TooltipInfo info="Nature">
              <div className="d-inline mx-1 mx-md-2">
                <EcoIcon />
                <div className="GlobalPlaceCount rounded-circle border border-light mx-1 p-1 ">
                  {props.users.placesCount[1]}
                </div>
              </div>
            </TooltipInfo>
            <TooltipInfo info="Sea">
              <div className="d-inline mx-1 mx-md-2">
                <WavesIcon />
                <div className="GlobalPlaceCount rounded-circle border border-light mx-1 p-1 ">
                  {props.users.placesCount[2]}
                </div>
              </div>
            </TooltipInfo>
            <TooltipInfo info="Others">
              <div className="d-inline mx-1 mx-md-2">
                <PublicIcon />
                <div className="GlobalPlaceCount rounded-circle border border-light mx-1 p-1 ">
                  {props.users.placesCount[3]}
                </div>
              </div>
            </TooltipInfo>
          </div>
        </div>
        <div className="col-12 mt-1">
          <div className="d-flex justify-content-between">
            <TooltipInfo info="Likes">
              <div className="RoundAndDark py-1 px-2 px-md-3">
                <FavoriteIcon fontSize="small" style={{ color: "#ffffffbd" }} />{" "}
                <p className="d-inline">{props.users.likes}</p>
              </div>
            </TooltipInfo>

            <div className="RoundAndDark py-1 px-2">
              <StarIcon fontSize="small" style={{ color: "#ffffffbd" }} />
              <p className="d-inline mx-2 GlobalBadgeText">{badgeText}</p>
              <StarIcon fontSize="small" style={{ color: "#ffffffbd" }} />
            </div>
            <TooltipInfo info="Posts">
              <div className="RoundAndDark py-1 px-2 px-md-3">
                <FeaturedPlayListIcon
                  fontSize="small"
                  style={{ color: "#ffffffbd" }}
                />{" "}
                <p className="d-inline">{props.users.posts}</p>
              </div>
            </TooltipInfo>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalUserCard;
