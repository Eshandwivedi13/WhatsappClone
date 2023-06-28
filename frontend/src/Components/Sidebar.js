import React, { useState, useEffect } from "react";
import TollIcon from "@mui/icons-material/Toll";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import "./Sidebar.css";
import UserProfile from "./UserProfile";
import { auth } from "./firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import db from "./firebase";

function Sidebar({ currentUser, parentCallBack }) {
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        parentCallBack(null);
        // const setToNull = null;
        localStorage.removeItem("user");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const [friendList, setFriendList] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  // useEffect(() => {
  //   const getAllUsers = async () => {
  //     await db.collection("users").onSnapshot((snapshot) =>
  //       //  console.log(snapshot.docs)
  //       setAllUsers(
  //         snapshot.docs.filter((doc) => doc.data().email !== currentUser?.email)
  //       )
  //     );
  //     console.log(allUsers + " THIS");
  //   };
  //   getAllUsers();
  // }, []);

  useEffect(() => {
    const getAllUsers = async () => {
      await db
        .collection("users")
        .onSnapshot((snapshot) =>
          setAllUsers(
            snapshot.docs.filter(
              (doc) => doc.data().email !== currentUser?.email
            )
          )
        );
    };

    const getFriends = async () => {
      await db
        .collection("Friendlist")
        .doc(currentUser.email)
        .collection("list")
        .onSnapshot((snapshot) => {
          setFriendList(snapshot.docs);
        });
    };

    getAllUsers();
    getFriends();
    // console.log(allUsers);
  }, []);

  // console.log(allUsers);

  const searchedUser = allUsers.filter((user) => {
    if (searchInput) {
      if (
        user.data().fullname.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return user;
      }
    }
  });

  const searchItem = searchedUser.map((user) => {
    return (
      <UserProfile
        name={user.data().fullname}
        photoURL={user.data().photoURL}
        email={user.data().email} //we will get searched email
      />
    );
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "20%",
    left: "45%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    border: "none",
    outline: "none",
    boxShadow: 10,
    p: 3,
  };
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-header-img">
            <img src={currentUser?.photoURL} alt="" />
          </div>
          <div className="sidebar-header-btn">
            <TollIcon />
            <InsertCommentIcon />
            <MoreVertIcon onClick={handleOpen} />
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Hello @{currentUser.fullname}
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                style={{ marginBottom: "10px" }}
              >
                Currently You are Logged in User, Do you Really Want to Signout?
              </Typography>
              <Button
                variant="contained"
                style={{ marginRight: "20px", background: "#dc3545" }}
                onClick={() => {
                  handleClose();
                  signOut();
                }}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                style={{ background: "#198754" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                }}
              >
                No
              </Button>
            </Box>
          </Modal>
        </div>
        <div className="sidebar-search">
          <div className="sidebar-search-input">
            <SearchIcon></SearchIcon>
            <input
              type="text"
              name="search"
              value={searchInput}
              placeholder="Search..."
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        <div className="sidebar-chat-list">
          {searchItem.length > 0
            ? searchItem
            : friendList.map((friend) => {
                return (
                  <UserProfile
                    name={friend.data().fullname}
                    photoURL={friend.data().photoURL}
                    lastMessage={friend.data().lastMessage}
                    // onClick={handleClick(dataOfFriend)}
                    email={friend.data().email}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
