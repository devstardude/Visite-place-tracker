import React from "react";
import MessageBox from "../MessageBox/MessageBox";
import Spinner from "../../../../Shared/Spinner/Spinner";
import "./MessageDiv.css";

const MessageDiv = (props) => {
  return (
    <div className="h-100 MessageDiv bd-dark">
      {props.loading && <Spinner />}
      {!props.loading && props.messages && props.messages.length === 0 && (
        <h4 className="Center mt-3">No Messages</h4>
      )}
      {!props.loading &&
        props.messages &&
        props.messages.map((m) => <MessageBox message={m} />)}
    </div>
  );
};

export default MessageDiv;
