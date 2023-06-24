import React from "react";
import TollIcon from "@mui/icons-material/Toll";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";

import "./Sidebar.css";
import UserProfile from "./UserProfile";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-img">
          <img src="./profile.jpg" alt="" />
        </div>
        <div className="sidebar-header-btn">
          <TollIcon />
          <InsertCommentIcon />
          <MoreVertIcon></MoreVertIcon>
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-search-input">
          <SearchIcon></SearchIcon>
          <input type="text" name="search" placeholder="Search..." />
        </div>
      </div>
      <div className="sidebar-chat-list">
        <UserProfile name="john Cena" photoURL="./profile.jpg" />
        <UserProfile name="Pon Cena" photoURL="./profile.jpg" />
        <UserProfile />
        <UserProfile />
        <UserProfile name="Pon Cena" photoURL="./profile.jpg" />
        <UserProfile name="Pon Cena" photoURL="./profile.jpg" />
        <UserProfile name="Pon Cena" photoURL="./profile.jpg" />
        <UserProfile name="Pon Cena" photoURL="./profile.jpg" />
        <UserProfile name="Pon Cena" photoURL="./profile.jpg" />
        <UserProfile name="Pon Cena" photoURL="./profile.jpg" />
        <UserProfile name="Pon Cena" photoURL="./profile.jpg" />
        <UserProfile name="Pon Cena" photoURL="./profile.jpg" />
        <UserProfile name="Pon Cena" photoURL="./profile.jpg" />
        <UserProfile name="Pon Cena" photoURL="./profile.jpg" />
        <UserProfile name="Pon Cena" photoURL="./profile.jpg" />
        <UserProfile name="Pon Cena" photoURL="./profile.jpg" />
      </div>
    </div>
  );
}

export default Sidebar;
