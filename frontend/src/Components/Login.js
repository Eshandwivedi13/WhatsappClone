import React from "react";
import "./Login.css";
import db, { auth, googleProvider } from "./firebase";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        const newUser = {
          fullname: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };
        navigate("/");
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        db.collection("users").doc(result.user.email).set(newUser); //inside database we are going to create a collection or folder name of users and inside that we are going to create a document of name user's email and we have to set this object inside that document
      })
      .catch((err) => alert(err.message));
  };
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="login-container">
        <img className="login-logo" src="./whatsapp-logo.png" alt="" />
        <p className="login-name">Whatsapp Web</p>
        <button className="login-btn" onClick={signInWithGoogle}>
          <img src="./google-logo.png" alt="login with google" />
          <p>Login With Google</p>
        </button>
      </div>
    </div>
  );
}

export default Login;
