import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/profileTop.css";
import { UserTweets } from "../main-components/UserTweets";
import Likes from "../main-components/Likes";
import { storage } from "../utils/firebase.config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { faHourglass3 } from "@fortawesome/free-solid-svg-icons";

export const ProfileTop = ({ user }) => {
  const [displayEditProfile, setDisplayEditProfile] = useState(false);
  const [newImage, setNewImage] = useState(null);

  console.log(newImage);

  const exitForm = () => {
    setDisplayEditProfile(false);
  };

  const editProfile = () => {
    setDisplayEditProfile(true);
  };

  const uploadImage = () => {
    if (newImage === null) return;
    const imageRef = ref(storage, `images/${newImage.name + v4()}`);
    uploadBytes(imageRef, newImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setNewImage(url);
        localStorage.setItem("profilePic", url);
      });
      setDisplayEditProfile(false);
    });
  };
  const buttontweet = document.querySelector(".buttontweet");
  const buttonlikes = document.querySelector(".buttonlikes");

  const toggleStyling = (e) => {
    if (e.target.textContent === "Likes") {
      buttonlikes.classList.add("selectedButton");
      buttontweet.classList.remove("selectedButton");
    } else {
      buttontweet.classList.add("selectedButton");
      buttonlikes.classList.remove("selectedButton");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("profilePic") === null) {
      return;
    } else if (localStorage.getItem("profilePic").includes("undefined")) {
      setNewImage("./assets/defaultprofile.png");
    } else setNewImage(localStorage.getItem("profilePic"));
  }, []);

  return (
    <div className="profileTop">
      <header className="header">
        <Link to="/mock-twitter">
          <img className="arrow" src="./assets/left-arrow.png" alt="" />
        </Link>
        <h3>{user.email?.split("@")[0]}</h3>
      </header>
      <div>
        <div className="grayspace"></div>
        <div className="profileInfo">
          <button onClick={editProfile} className="setupProfile">
            Set up profile
          </button>
          <img
            src={newImage === null ? "./assets/defaultprofile.png" : newImage}
            className="profilePic"
            alt=""
          />
          <div className="followers">
            <p style={{ fontWeight: "bold" }}>
              0 <span style={{ color: "gray" }}>Followers</span>
            </p>
            <p style={{ fontWeight: "bold" }}>
              0 <span style={{ color: "gray" }}>Following</span>
            </p>
          </div>
          <nav>
            <Link to="/mock-twitter/profile">
              <button
                onClick={(e) => toggleStyling(e)}
                className="buttontweet selectedButton"
              >
                Tweets
              </button>
            </Link>
            <Link to="/mock-twitter/profile/likes">
              <button onClick={(e) => toggleStyling(e)} className="buttonlikes">
                Likes
              </button>
            </Link>
          </nav>
        </div>
      </div>
      {displayEditProfile && (
        <div
          className="signUpForm"
          style={{ textAlign: "center", marginTop: "10%" }}
        >
          <h1 style={{ marginTop: "0" }}>Change Profile Picture</h1>
          <input
            className="input"
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => setNewImage(e.target.files[0])}
          />
          <button onClick={uploadImage} id="input--btn" className="input">
            Submit Picture
          </button>
          <button
            style={{ backgroundColor: "gray" }}
            onClick={exitForm}
            className="input"
            id="input--btn"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
