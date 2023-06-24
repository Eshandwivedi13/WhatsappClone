import React from "react";
import Sidebar from "./Sidebar";
import "./Home.css";
function Home() {
  return (
    <div className="home">
      <div className="home-container">
        {/* sideBar for whatsapp logo */}
        <Sidebar />
        <div className="home-bg">
          <img src="./WhatsAppbg.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
