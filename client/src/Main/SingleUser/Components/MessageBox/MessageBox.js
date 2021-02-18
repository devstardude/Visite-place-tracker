import React from "react";

import'./MessageBox.css';
const MessageBox = (props) => {
  const { text, uid, photoURL } = props.message;
  return (
    <div className="container p-3 ">
      <div className="d-flex align-middle">
        <img className="MessageImage" src={photoURL} alt="..." />
        <p class="align-self-center MessageBoxText">i am papa please bete maan le meri baat</p>
      </div>
    </div>
  );
};

export default MessageBox;
