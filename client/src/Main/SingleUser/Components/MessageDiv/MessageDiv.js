import React from "react";
import MessageBox from "../MessageBox/MessageBox";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../../../firebase/firebase";
import Spinner from "../../../../Shared/Spinner/Spinner";
import "./MessageDiv.css";

const MessageDiv = (props) => {
  const messagesRef = firestore.collection(`user-${props.id}`);
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  if(!messages){
    return (
      <div className="h-100 MessageDiv">
        <div className="mt-3">
          <Spinner />
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-100 MessageDiv">
      {messages && messages.map((m) => <MessageBox message={m} />)}

      {messages.length===0 && <h4 className="Center mt-3">No Messages</h4>}
    </div>
  );
};

export default MessageDiv;
