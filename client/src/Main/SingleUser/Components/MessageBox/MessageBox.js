import React from "react";
import { Link} from "react-router-dom";
import TooltipInfo from "../../../../Shared/TooltipInfo/TooltipInfo";
import "./MessageBox.css";
const MessageBox = (props) => {
  const { text, senderId, senderName, senderDp } = props.message;
  return (
    <div className="container pt-3 pb-2 px-3">
      <div className="d-flex align-middle">
        <TooltipInfo info={senderName}>
          <img className="MessageImage" src={senderDp} alt="..." />
        </TooltipInfo>
        <Link to={`/user/${senderId}`}>
          <p className="align-self-center MessageBoxText">{text}</p>
        </Link>
      </div>
    </div>
  );
};

export default MessageBox;
