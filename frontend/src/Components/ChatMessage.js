import React from "react";
import "./ChatMessage.css";
function ChatMessage({ message, time }) {
  return (
    <div className="chat-message">
      <div className="chat-message-text">
        <p>{message}</p>
      </div>
      <div className="chat-message-date">
        <p>{time}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
