import React from "react";
import "../styles/tweet.css";

export const Tweet = ({ user, name, tweet, id }) => {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  return (
    <div className="tweet--container" id={id}>
      <div>
        <img
          className="tweet--image"
          src={
            localStorage.getItem("profilePic")
              ? localStorage.getItem("profilePic")
              : "./assets/defaultprofile.png"
          }
          alt=""
        />
      </div>
      <div className="tweet--info">
        <div
          className="tweet--username"
          style={{ color: "gray", marginBottom: "-4%" }}
        >
          <h4 style={{ color: "white", fontWeight: "bold" }}>{name}</h4>•
          <span style={{ color: "gray" }}>{date}</span>
        </div>
        <div className="tweet--text">{tweet}</div>
        <div className="tweet--favorite"></div>
      </div>
    </div>
  );
};
