import React from 'react';
import MessageBox from '../MessageBox/MessageBox';

import'./MessageDiv.css';

const MessageDiv = (props)=>{
    const messages = [
      {
        text: "Helo Babe",
        photoURL:
          "https://lh3.googleusercontent.com/a-/AOh14GhdjLQbJ3MbF_f1xTIU9oz_7_arV-yGFmFun5kT=s96-c",
      },
      {
        text: "Helo Babe",
        photoURL:
          "https://lh3.googleusercontent.com/a-/AOh14GhdjLQbJ3MbF_f1xTIU9oz_7_arV-yGFmFun5kT=s96-c",
      },
      {
        text: "Helo Babe",
        photoURL:
          "https://lh3.googleusercontent.com/a-/AOh14GhdjLQbJ3MbF_f1xTIU9oz_7_arV-yGFmFun5kT=s96-c",
      },
      {
        text: "Helo Babe",
        photoURL:
          "https://lh3.googleusercontent.com/a-/AOh14GhdjLQbJ3MbF_f1xTIU9oz_7_arV-yGFmFun5kT=s96-c",
      },
      {
        text: "Helo Babe",
        photoURL:
          "https://lh3.googleusercontent.com/a-/AOh14GhdjLQbJ3MbF_f1xTIU9oz_7_arV-yGFmFun5kT=s96-c",
      },
      {
        text: "Helo Babe",
        photoURL:
          "https://lh3.googleusercontent.com/a-/AOh14GhdjLQbJ3MbF_f1xTIU9oz_7_arV-yGFmFun5kT=s96-c",
      },
      {
        text: "Helo Babe",
        photoURL:
          "https://lh3.googleusercontent.com/a-/AOh14GhdjLQbJ3MbF_f1xTIU9oz_7_arV-yGFmFun5kT=s96-c",
      },
      {
        text: "Helo Babe",
        photoURL:
          "https://lh3.googleusercontent.com/a-/AOh14GhdjLQbJ3MbF_f1xTIU9oz_7_arV-yGFmFun5kT=s96-c",
      },
      {
        text: "Helo Babe",
        photoURL:
          "https://lh3.googleusercontent.com/a-/AOh14GhdjLQbJ3MbF_f1xTIU9oz_7_arV-yGFmFun5kT=s96-c",
      },
      {
        text: "Helo Babe",
        photoURL:
          "https://lh3.googleusercontent.com/a-/AOh14GhdjLQbJ3MbF_f1xTIU9oz_7_arV-yGFmFun5kT=s96-c",
      },
      {
        text: "Helo Babe",
        photoURL:
          "https://lh3.googleusercontent.com/a-/AOh14GhdjLQbJ3MbF_f1xTIU9oz_7_arV-yGFmFun5kT=s96-c",
      },
      {
        text: "Helo Babe",
        photoURL:
          "https://lh3.googleusercontent.com/a-/AOh14GhdjLQbJ3MbF_f1xTIU9oz_7_arV-yGFmFun5kT=s96-c",
      },
    ];
    return (
      <div className="h-100 MessageDiv">
        {messages.map((m) => (
          <MessageBox message={m} />
        ))}
      </div>
    );
};

export default MessageDiv ;