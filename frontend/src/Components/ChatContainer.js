import React from "react";
import "./ChatContainer.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatMessage from "./ChatMessage";

function ChatContainer() {
  return (
    <div className="chat-container">
      <div className="chat-container-header">
        <div className="chat-user-info">
          <div className="chat-user-img">
            <img src="./profile.jpg" alt="" />
          </div>
          <p>John babu</p>
        </div>
        <div className="chat-container-header-btn">
          <MoreVertIcon />
        </div>
      </div>
      <div className="chat-display-container">
        <ChatMessage message="hello, how are you?" time="14-12-2021" />
        <ChatMessage message="hello, how are you?" time="14-12-2021" />
        <ChatMessage message="hello, how are you?" time="14-12-2021" />
      </div>
    </div>
  );
}

export default ChatContainer;
