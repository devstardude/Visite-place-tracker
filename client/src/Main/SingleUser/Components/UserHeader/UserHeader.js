import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CoverPic from "../../../../assets/images/cover.jpg";
import { AuthContext } from "../../../../Shared/Context/auth-context";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SendMessageModal from "../SendMessageModal/SendMessageModal";
import { useHttpClient } from "../../../../Shared/hooks/http-hook";
import ErrorModal from "../../../../Shared/ErrorModal/ErrorModal";
import "./UserHeader.css";

const UserHeader = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const currentUserCheck = props.user._id === auth.userId;
const alreadyLiked = props.user.likes.includes(auth.userId);
const [isLiked,setIsLiked]=useState(alreadyLiked)

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
      setIsLiked(true)
      props.giveLikeCount(props.user._id);
    } catch (err) {}
  };
  return (
    <React.Fragment>
      {error && <ErrorModal errorText={error} clicked={clearError} />}
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
          <h2>{props.user.username}</h2>
          <p className="UserHeaderBio my-3 mx-auto">{props.user.bio}</p>
          {!currentUserCheck && (
            <div>
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
            <Link to="/add">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill"
              >
                ➕ Add
              </button>
            </Link>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserHeader;
