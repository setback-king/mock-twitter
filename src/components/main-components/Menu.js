import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase.config.js";
import { Link } from "react-router-dom";
import "../styles/menu.css";

function Menu() {
  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="menu">
      <div className="top--menu">
        <Link
          to="/"
          className="link--icon"
          style={{
            marginTop: "20px",
            width: "4%",
            padding: "0",
            marginLeft: "38%",
            marginBottom: "20px",
          }}
        >
          <i
            className="fa fa-twitter"
            style={{
              fontSize: "30px",
              color: "white",
              cursor: "pointer",
            }}
          ></i>
        </Link>
        <Link to="/" className="link--button">
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <i
              className="fa fa-home"
              style={{ fontSize: "27px", marginRight: "7px" }}
            ></i>
            Home
          </div>
        </Link>
        <Link to="/" className="link--button">
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <img src="assets/hashtag.png" style={{ width: "27px" }} alt="" />
            Explore
          </div>
        </Link>
        <Link to="/notifications" className="link--button">
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <img src="assets/bell.png" style={{ width: "27px" }} alt="" />
            Notifications
          </div>
        </Link>
        <Link className="link--button" to="/messages">
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <img src="assets/email.png" style={{ width: "27px" }} alt="" />
            Messages
          </div>
        </Link>
        <Link to="/" className="link--button">
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <img
              src="assets/bookmark-white.png"
              style={{ width: "27px" }}
              alt=""
            />
            Bookmarks
          </div>
        </Link>
        <Link className="link--button" to="/profile">
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <img src="assets/user.png" style={{ width: "27px" }} alt="" />
            Profile
          </div>
        </Link>
        <button className="tweet--button">Tweet</button>
      </div>
      <div className="bottom--menu">
        <Link to="/" style={{ textDecoration: "none" }}>
          <button onClick={logOut} className="signOut--button">
            <img src="assets/profile2.png" alt="" />
            Log Out
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
