import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/profileTop.css";
import { UserTweets } from "../main-components/UserTweets";
import Likes from "../main-components/Likes";
import { storage } from "../utils/firebase.config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export const ProfileTop = ({ user }) => {
  const [displayEditProfile, setDisplayEditProfile] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [linkSelected, setLinkSelected] = useState(true);

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
        <Link to="/">
          <img className="arrow" src="./assets/left-arrow.png" alt="" />
        </Link>
        Username here
      </header>
      <div>
        <div
          style={{
            width: "100%",
            backgroundColor: "rgb(65, 66, 69)",
            height: "180px",
          }}
        ></div>
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
              30 <span style={{ color: "gray" }}>Followers</span>
            </p>
            <p style={{ fontWeight: "bold" }}>
              35 <span style={{ color: "gray" }}>Following</span>
            </p>
          </div>
          <nav>
            <Link to="/profile">
              <button
                onClick={(e) => toggleStyling(e)}
                className="buttontweet buttonSelected"
              >
                Tweets
              </button>
            </Link>
            <Link to="likes">
              <button onClick={(e) => toggleStyling(e)} className="buttonlikes">
                Likes
              </button>
            </Link>
          </nav>
        </div>
      </div>
      {displayEditProfile && (
        <div className="signUpForm" style={{ textAlign: "center" }}>
          <h1 style={{ marginTop: "0" }}>Change Profile Picture</h1>
          <input
            className="input"
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => setNewImage(e.target.files[0])}
          />
          <button onClick={uploadImage} className="input">
            Submit Picture
          </button>
          <button
            style={{ backgroundColor: "gray" }}
            onClick={exitForm}
            className="input"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
