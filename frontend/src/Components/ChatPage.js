import React from "react";
import Sidebar from "./Sidebar";
import ChatContainer from "./ChatContainer";
import "./ChatPage.css";
function ChatPage() {
  return (
    <div className="chatpage">
      <div className="chatpage-container">
        <Sidebar />
        <ChatContainer />
      </div>
    </div>
  );
}

export default ChatPage;
