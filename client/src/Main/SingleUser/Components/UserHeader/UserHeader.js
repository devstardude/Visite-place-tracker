import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CoverPic from "../../../../assets/images/banner.jpg";
import { AuthContext } from "../../../../Shared/Context/auth-context";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SendMessageModal from "../SendMessageModal/SendMessageModal";
import { useHttpClient } from "../../../../Shared/hooks/http-hook";
import SettingsIcon from "@material-ui/icons/Settings";
import ExploreIcon from "@material-ui/icons/Explore";
import ErrorModal from "../../../../Shared/ErrorModal/ErrorModal";
import "./UserHeader.css";
import Masthead from "../../../../Shared/Masthead/Masthead";

const UserHeader = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const currentUserCheck = props.user._id === auth.userId;
  const alreadyLiked = props.user.likes.includes(auth.userId);
  const [isLiked, setIsLiked] = useState(alreadyLiked);

  const giveLikeHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/like/${props.user._id}`,
        "PATCH",
        null,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setIsLiked(true);
      props.giveLikeCount(props.user._id);
    } catch (err) {}
  };
  return (
    <React.Fragment>
      {error && <ErrorModal errorText={error} clicked={clearError} />}
      <Masthead />
      <div className="WaveBackground">
        <div className="container pb-4">
          <div className="Owner ">
            <div className="Avatar ">
              <img
                alt="..."
                className="Img-circle Img-no-padding img-responsive"
                src={props.user.dp}
              />
            </div>
            <h2>{props.user.username}</h2>
            <p className="UserHeaderBio my-3 mx-auto">{props.user.bio}</p>
            {!currentUserCheck && (
              <div className="OtherUserButtons">
                <button
                  onClick={giveLikeHandler}
                  type="button"
                  className={`btn LikeProfileButton rounded-pill ${
                    !isLiked ? "btn-outline-danger" : "btn-danger"
                  } my-2 mx-2`}
                >
                  <FavoriteIcon /> {isLiked ? "Profile Liked" : "Like Profile"}
                </button>
                <SendMessageModal id={props.user._id} />
              </div>
            )}
            {currentUserCheck && (
              <div className="UserButtons">
                <Link to="/add">
                  <button
                    onClick={giveLikeHandler}
                    type="button"
                    className="btn btn-outline-primary rounded-pill my-2 mx-2"
                  >
                    <ExploreIcon /> Add Memories
                  </button>
                </Link>
                <Link to="/edit/user">
                  <button
                    onClick={giveLikeHandler}
                    type="button"
                    className="btn btn-outline-danger rounded-pill my-2 mx-2"
                  >
                    <SettingsIcon /> Change Profile
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};



export default UserHeader;
