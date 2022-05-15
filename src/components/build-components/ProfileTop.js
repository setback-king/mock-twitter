import React from "react";
import "../styles/profileTop.css";

export const ProfileTop = () => {
  return (
    <div className="profileTop">
      <header className="header">
        <img className="arrow" src="assets/left-arrow.png" alt="" />
        Username here
      </header>
      <div>
        <div
          style={{
            width: "100%",
            backgroundColor: "rgb(93, 96, 99)",
            height: "180px",
          }}
        ></div>
        <div className="profileInfo">
          <button className="setupProfile">Set up profile</button>
          <img src="assets/defaultprofile.png" className="profilePic" alt="" />
          <div className="followers">
            <p>
              30 <span style={{ color: "gray" }}>Followers</span>
            </p>
            <p>
              35 <span style={{ color: "gray" }}>Following</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
