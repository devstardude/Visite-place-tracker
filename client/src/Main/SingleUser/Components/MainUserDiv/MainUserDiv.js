import React from "react";
import PlaceDiv from "../PlaceDiv/PlaceDiv";
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
        <PostDiv/>
      </div>
    );
  } else {
    return (
      <div className="MainUserDiv mx-auto">
        <PlaceDiv />
      </div>
    );
  }
};

export default MainUserDiv;
