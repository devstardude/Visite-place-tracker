import React from "react";
import VisitedDiv from "../VisitedDiv/VisitedDiv";
import WishlistDiv from "../WishlistDiv/WishlistDiv";
import PostDiv from "../PostsDiv/PostDiv";
import MessageDiv from "../MessageDiv/MessageDiv";
import "./MainUserDiv.css";

const MainUserDiv = (props) => {
  const divType = props.divType;
  if (divType === "messageDiv") {
    return (
      <div className="MainUserDiv mx-auto">
        <MessageDiv />
      </div>
    );
  } else if (divType === "postDiv") {
    return (
      <div className="MainUserDiv mx-auto">
        <PostDiv />
      </div>
    );
  } else if (divType === "wishlist") {
    return (
      <div className="MainUserDiv mx-auto">
        <WishlistDiv {...props} />
      </div>
    );
  } else if (divType === "visited") {
    return (
      <div className="MainUserDiv mx-auto">
        <VisitedDiv {...props} />
      </div>
    );
  }
};

export default MainUserDiv;
