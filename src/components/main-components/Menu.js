import React, { useState } from "react";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  limit,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../utils/firebase.config.js";
import { Link } from "react-router-dom";
import "../styles/menu.css";

function Menu({ user }) {
  const [createTweet, setCreateTweet] = useState(false);
  const [publishTweet, setPublishTweet] = useState("");

  const logOut = async () => {
    await signOut(auth);
  };

  const openTweet = () => {
    setCreateTweet(true);
  };

  const submitTweet = (publishTweet) => {
    setCreateTweet(false);
    sendTweet(publishTweet).then(() => {
      document.location.reload();
    });
  };

  const cancelTweet = () => {
    setCreateTweet(false);
  };

  const tweetField = document.getElementById("tweet--box");

  async function sendTweet(tweet) {
    try {
      await addDoc(collection(db, "tweets"), {
        name: user.email?.split("@")[0],
        tweet: publishTweet,
        timestamp: serverTimestamp(),
        id: user?.uid,
      })
        .then(() => {
          setPublishTweet("");
        })
        .then(() => {
          tweetField.value = "";
        });
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error);
    }
  }
  return (
    <div className="menu">
      <div className="positionContent">
        <div className="top--menu">
          <Link to="/" className="link--icon">
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
              <span className="link--text">Home</span>
            </div>
          </Link>
          <Link to="/news" className="link--button">
            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <img
                src="./assets/hashtag.png"
                style={{ width: "27px" }}
                alt=""
              />
              <span className="link--text">Explore</span>
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
              <img src="./assets/bell.png" style={{ width: "27px" }} alt="" />
              <span className="link--text">Notifications</span>
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
              <img src="./assets/email.png" style={{ width: "27px" }} alt="" />
              <span className="link--text">Messages</span>
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
              <img src="./assets/user.png" style={{ width: "27px" }} alt="" />
              <span className="link--text">Profile</span>
            </div>
          </Link>
          <button onClick={openTweet} className="tweet--button">
            Tweet
          </button>
        </div>
        <div className="bottom--menu">
          <Link to="/" style={{ textDecoration: "none" }}>
            <button onClick={logOut} className="signOut--button">
              <img src="assets/profile2.png" className="logout--img" alt="" />
              Log Out
            </button>
          </Link>
        </div>
        {createTweet && (
          <div className="tweet--popup">
            <div className="newTweet">
              <div className="timeline--image">
                <img
                  className="timeline--pic"
                  src={localStorage.getItem("profilePic")}
                  alt=""
                />
              </div>
              <div className="tweet--input">
                <textarea
                  className="tweet--input"
                  id="tweet--box"
                  maxLength="280"
                  type="text"
                  rows="3"
                  placeholder="What's Happening"
                  onChange={(e) => setPublishTweet(e.target.value)}
                />
              </div>
            </div>
            <hr />

            <button onClick={submitTweet} className="timeline--tweet--btn">
              Tweet
            </button>
            <button
              onClick={cancelTweet}
              className="timeline--tweet--btn"
              style={{ backgroundColor: "gray" }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
