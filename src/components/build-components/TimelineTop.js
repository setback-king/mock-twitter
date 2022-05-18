import React, { useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase.config";

export const TimelineTop = () => {
  useEffect(() => {
    const imagesRef = ref(storage, "images/");
    console.log(imagesRef);
  }, []);

  return (
    <div className="timeline--top">
      <header className="timeline--header">Home</header>
      <div className="container">
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
              maxlength="280"
              type="text"
              rows="3"
              placeholder="What's Happening"
            />
          </div>
        </div>
        <hr />
        <button className="timeline--tweet--btn">Tweet</button>
      </div>
    </div>
  );
};
