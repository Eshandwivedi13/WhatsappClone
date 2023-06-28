import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Home.css";
function Home({ currentUser, parentCallBack }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <div className="home">
      <div className="home-container">
        {/* sideBar for whatsapp logo */}
        <Sidebar currentUser={currentUser} parentCallBack={parentCallBack} />
        <div className="home-bg">
          <img src="./WhatsAppbg.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
