import React, { useEffect, useRef, useState } from "react";
import "./ChatContainer.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmotIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import ChatMessage from "./ChatMessage";
import EmojiPicker from "emoji-picker-react";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";

function ChatContainer({ currentUser }) {
  const { emailId } = useParams();
  const [message, setMessage] = useState("");
  const [openEmojiBox, setOpenEmojiBox] = useState(false);
  const [chatUser, setChatUser] = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  const chatBox = useRef(null); // stores the refrence of any component inside a variable
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const getUser = async () => {
      await db
        .collection("users")
        .doc(emailId)
        .onSnapshot((snapshot) => {
          setChatUser(snapshot.data());
        });
      //find that particular data whose id is this email id
    };
    const getMessages = async () => {
      await db
        .collection("chats")
        .doc(emailId)
        .collection("message")
        .orderBy("timeStamp", "asc")
        .onSnapshot((snapshot) => {
          let messages = snapshot.docs.map((doc) => doc.data());

          let newMessage = messages.filter(
            (message) =>
              message.senderEmail === (currentUser.email || emailId) ||
              message.receiverEmail === (currentUser.email || emailId)
          );
          setChatMessages(newMessage);
        });
    };
    getUser();
    getMessages();
  }, [emailId]);

  useEffect(() => {
    console.log(chatBox.current);
    chatBox.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, [chatMessages]);

  // const scrollToBottom = () => {
  //   chatBox.current?.scrollIntoView({
  //     behavior: "smooth",
  //     block: "end",
  //     inline: "nearest",
  //   });
  // };
  // useEffect(() => {
  //   scrollToBottom();
  // }, [chatMessages]);

  const send = (e) => {
    e.preventDefault();
    if (emailId) {
      let payload = {
        text: message,
        senderEmail: currentUser.email,
        receiverEmail: emailId,
        timeStamp: firebase.firestore.Timestamp.now(),
      };
      // console.log(payload);
      //sender
      db.collection("chats")
        .doc(currentUser.email)
        .collection("message")
        .add(payload);
      //reciever
      db.collection("chats").doc(emailId).collection("message").add(payload);

      //add user to sender friend list
      db.collection("Friendlist")
        .doc(currentUser.email)
        .collection("list")
        .doc(emailId)
        .set({
          email: chatUser.email,
          fullname: chatUser.fullname,
          photoURL: chatUser.photoURL,
          lastMessage: message,
        });
      //add user to reciever friend list
      db.collection("Friendlist")
        .doc(emailId)
        .collection("list")
        .doc(currentUser.email)
        .set({
          email: currentUser.email,
          fullname: currentUser.fullname,
          photoURL: currentUser.photoURL,
          lastMessage: message,
        });
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-container-header">
        <div className="chat-user-info">
          <div className="chat-user-img">
            <img src={chatUser?.photoURL} alt="" />
          </div>
          <p>{chatUser?.fullname}</p>
        </div>
        <div className="chat-container-header-btn" ref={chatBox}>
          <MoreVertIcon />
        </div>
      </div>

      <div className="chat-display-container">
        {chatMessages.map((message) => (
          <ChatMessage
            message={message.text}
            time={message.timeStamp}
            sender={message.senderEmail}
            currentUser={currentUser}
          />
        ))}
      </div>

      <div className="chat-input">
        {openEmojiBox && (
          <div
            style={{
              bottom: "0",
              position: "absolute",
              top: "-450px",
            }}
          >
            {
              <EmojiPicker
                onEmojiClick={(emojiObject) =>
                  setMessage((message) => message + emojiObject.emoji)
                }
              />

              // <EmojiPicker onEmojiClick={(emojiObject)=> setMsg((prevMsg)=> prevMsg + emojiObject.emoji)}/>
            }
          </div>
        )}
        <div className="chat-input-btn" style={{ zIndex: "10" }}>
          <InsertEmotIcon
            onClick={(e) => {
              e.preventDefault();
              setOpenEmojiBox(!openEmojiBox);
            }}
          />
          <AttachFileIcon />
        </div>
        <form action="" method="get" onSubmit={send}>
          <input
            type="text"
            style={{ position: "relative" }}
            placeholder="Type a Message"
            value={message}
            // style={{ zIndex: "100" }}
            onChange={(e) => {
              setMessage(e.target.value); //we assign a value to the message, means updating the state
            }}
          />
        </form>
        <div className="chat-input-send-btn">
          <SendIcon onClick={send} />
        </div>
        {/* <div>
            <InsertEmotIcon />
            <AttachFileIcon />
          </div> */}
      </div>
    </div>
  );
}

export default ChatContainer;
