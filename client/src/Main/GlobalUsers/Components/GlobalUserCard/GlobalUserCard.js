import React from "react";
import {Link} from "react-router-dom";
import "./GlobalUserCard.css";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import EcoIcon from "@material-ui/icons/Eco";
import PublicIcon from "@material-ui/icons/Public";
import WavesIcon from "@material-ui/icons/Waves";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import StarIcon from "@material-ui/icons/Star";
import TooltipInfo from "../../../../Shared/TooltipInfo/TooltipInfo";
import {badge,placeCount} from "../../../../utils/utils";
const GlobalUserCard = (props) => {
  const likes = props.user.likes.length
  const posts = props.user.posts.length
  const userPlaceCount = placeCount(props.user.places)
  const badgeText = badge(
    userPlaceCount.urbanCount,
    userPlaceCount.natureCount,
    userPlaceCount.seaCount,
    userPlaceCount.otherCount
  );
  return (
    <div className="container GlobalUserCard m-0 p-2 mx-auto">
      <div className="row p-2 p-md-1">
        <div className="col-4">
          <Link to={`/user/${props.user.id}`}>
            <div className="d-inline-block GlobalAvtarDiv">
              <img className=" GlobalAvatar" src={props.user.dp} alt="Dp.jpg" />
            </div>
          </Link>
        </div>
        <div className="col-8">
          <Link to={`/user/${props.user.id}`}>
            <div className="GlobalDetailsDiv RoundAndDark p-2">
              <h3 className="m-0 pb-1 GlobalName">{props.user.username}</h3>
              <p className="m-0 pb-1 GlobalDesc">
                {props.user.bio.slice(0, 65)}{" "}
                {props.user.bio.slice(65, 76) && "... (Read More)"}
              </p>
            </div>
          </Link>
        </div>
        <div className="col-12">
          <div className="RoundAndDark text-center mt-3 mb-2 p-2">
            <TooltipInfo info="Urban">
              <div className="d-inline mx-1 mx-md-2">
                <EmojiTransportationIcon />
                <div className="GlobalPlaceCount rounded-circle border border-light mx-1 p-1 ">
                  {userPlaceCount.urbanCount}
                </div>
              </div>
            </TooltipInfo>
            <TooltipInfo info="Nature">
              <div className="d-inline mx-1 mx-md-2">
                <EcoIcon />
                <div className="GlobalPlaceCount rounded-circle border border-light mx-1 p-1 ">
                  {userPlaceCount.natureCount}
                </div>
              </div>
            </TooltipInfo>
            <TooltipInfo info="Sea">
              <div className="d-inline mx-1 mx-md-2">
                <WavesIcon />
                <div className="GlobalPlaceCount rounded-circle border border-light mx-1 p-1 ">
                  {userPlaceCount.seaCount}
                </div>
              </div>
            </TooltipInfo>
            <TooltipInfo info="Others">
              <div className="d-inline mx-1 mx-md-2">
                <PublicIcon />
                <div className="GlobalPlaceCount rounded-circle border border-light mx-1 p-1 ">
                  {userPlaceCount.otherCount}
                </div>
              </div>
            </TooltipInfo>
          </div>
        </div>
        <div className="col-12 mt-1 mt-lg-2">
          <div className="d-flex justify-content-between">
            <TooltipInfo info="Likes">
              <div className="RoundAndDark py-1 px-2 px-md-3">
                <FavoriteIcon fontSize="small" style={{ color: "#ffffffbd" }} />{" "}
                <p className="d-inline">{likes}</p>
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
                <p className="d-inline">{posts}</p>
              </div>
            </TooltipInfo>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalUserCard;
