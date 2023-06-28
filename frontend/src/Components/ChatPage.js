import React from "react";
import Sidebar from "./Sidebar";
import ChatContainer from "./ChatContainer";
import "./ChatPage.css";
function ChatPage({ currentUser }) {
  return (
    <div className="chatpage">
      <div className="chatpage-container">
        <Sidebar currentUser={currentUser} />
        <ChatContainer currentUser={currentUser} />
      </div>
    </div>
  );
}

export default ChatPage;
