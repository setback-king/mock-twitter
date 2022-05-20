import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
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
import { storage } from "../utils/firebase.config";
import "../styles/timeline.css";
import { Tweet } from "../build-components/Tweet";

export const Timeline = ({ user }) => {
  const [tweet, setTweet] = useState("");
  const [allTweets, setAllTweets] = useState([]);

  const tweetRefs = query(
    collection(db, "tweets"),
    orderBy("timestamp", "desc")
  );
  // const q = query(collection(db, "tweets"), orderBy("timestamp", "desc"));

  useEffect(() => {
    const imagesRef = ref(storage, "images/");
    const getTweetsData = async () => {
      const tweetData = await getDocs(tweetRefs);
      setAllTweets(
        tweetData.docs.map((doc) => ({ ...doc.data(), keyId: doc.id }))
      );
      //  const querySnapshot = await getDocs(q);
      //  setAllTweets(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
    };

    getTweetsData();
  }, []);

  const tweetField = document.getElementById("tweet--box");

  async function sendTweet(tweet) {
    try {
      await addDoc(collection(db, "tweets"), {
        name: user.email?.split("@")[0],
        tweet: tweet,
        timestamp: serverTimestamp(),
        id: user?.uid,
      })
        .then(() => {
          setTweet("");
        })
        .then(() => {
          tweetField.value = "";
        })
        .then(() => {
          document.location.reload();
        });
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error);
    }
  }

  const tweetElements = allTweets.map((each) => {
    return (
      <Tweet
        name={each.name}
        tweet={each.tweet}
        id={each.id}
        key={each.keyId}
        time={each.timestamp.toDate()}
      />
    );
  });

  return (
    <div className="timeline">
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
                id="tweet--box"
                className="tweet--input"
                maxLength="280"
                type="text"
                rows="3"
                placeholder="What's Happening"
                onChange={(e) => setTweet(e.target.value)}
              />
            </div>
          </div>
          <hr />
          <button
            onClick={() => sendTweet(tweet)}
            className="timeline--tweet--btn"
          >
            Tweet
          </button>
        </div>
        {tweetElements}
      </div>
    </div>
  );
};
