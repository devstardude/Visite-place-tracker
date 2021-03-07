import React, { useState, useRef, useContext, useEffect } from "react";
import firebase from "firebase/app";
import { firestore } from "../../../../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./GlobalZoneChatDiv.css";
import { AuthContext } from "../../../../Shared/Context/auth-context";
import Spinner from "../../../../Shared/Spinner/Spinner";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const GlobalZoneChatDiv = (props) => {
  const auth = useContext(AuthContext);
  const [formValue, setFormValue] = useState("");
  const dummy = useRef();
  const messagesRef = firestore.collection("global-chat");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  const bottomScrollHandler=()=>{
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }

  const sendMessage = async (event) => {
    event.preventDefault();
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      dp: auth.dp,
      uid: auth.userId,
    });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  if (!messages) {
    return (
        <div className="mt-3">
          <span ref={dummy}></span>
          <Spinner color="black" />
        </div>
    );
  }
  return (
    <div className="row border ChatContainer">
      <div className="col-12 p-2 p-md-3 ChatMessageContainer">
        <div className="container-fluid ChatMessageOverflow p-3 Card bg-light shadow-sm h-100">
          <div className="row">
            {messages &&
              messages.map((msg) => (
                <ChatMsg key={msg.id} message={msg} />
              ))}{" "}
          </div>
          <span ref={dummy}></span>
        </div>
        <div className="Right ">
          <ExpandMoreIcon
            className="CursorPointer bg-light rounded "
            onClick={bottomScrollHandler}
          />
        </div>
      </div>
      <div className="col-12 px-2 px-md-3 mt-3 mt-md-0">
        <div class="input-group ">
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            type="text"
            class="form-control"
            placeholder="Say Something Nice"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              disabled={!formValue}
              type="button"
              onClick={sendMessage}
            >
              Send 🕊️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const ChatMsg = (props) => {
  const auth = useContext(AuthContext);
  const { text, uid, dp } = props.message;
  const messageClass = uid === auth.userId ? "sent" : "received";
  return (
    <div className="col-12 m-1 ">
      <div className={`message ${messageClass}`}>
        <img className="Image" src={dp} alt="dp.jpg" />
        <p style={{ textAlign: "left" }} className="ChatText">
          {text}
        </p>
      </div>
    </div>
  );
};

export default GlobalZoneChatDiv;
