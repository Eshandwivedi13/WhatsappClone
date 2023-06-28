import React from "react";
import { auth } from "./firebase";
import "./ChatMessage.css";
function ChatMessage({ message, time, sender }) {
  // console.log(auth?.currentUser.email);
  return (
    // <div
    //   className="chat-message snd "
    //   style={{
    //     // alignSelf:
    //     //   sender === auth?.currentUser.email ? "flex-end" : "flex-start",

    //     // backgroundColor:
    //     //   sender === auth?.currentUser.email ? "#dcf8c6" : "#fff",
    //     // float: sender === auth?.currentUser.email ? "right" : "",
    //     // flex: sender === auth?.currentUser.email ? "row" : "",
    //   }}
    // >

    <div
      className={`chat-message ${
        sender === auth?.currentUser.email ? "snd" : "rcv"
      }`}
    >
      <div className="chat-message-text">
        <p>{message}</p>
      </div>
      <div className="chat-message-date">
        <p>{new Date(time.toDate()).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
