import React, { useEffect, useState } from "react";
import "../styles/tweets.css";
import { Tweet } from "../build-components/Tweet";
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

export const UserTweets = ({ user }) => {
  const [userTweets, setUserTweets] = useState([]);

  const userTweetRefs = query(
    collection(db, "tweets"),
    orderBy("timestamp", "desc"),
    where("id", "==", user?.uid || null)
  );

  useEffect(() => {
    const getTweetsData = async () => {
      const tweetData = await getDocs(userTweetRefs);
      setUserTweets(
        tweetData.docs.map((doc) => ({ ...doc.data(), keyId: doc.id }))
      );
    };
    getTweetsData();
  }, []);

  const userTweetElements = userTweets.map((tweet) => {
    return (
      <Tweet
        user={user}
        name={tweet.name}
        tweet={tweet.tweet}
        key={tweet.keyId}
      />
    );
  });

  return userTweets.length > 0 ? (
    <div className="tweets">{userTweetElements}</div>
  ) : (
    <div className="noTweets">
      <h2>Welcome. No tweets observed.</h2>
    </div>
  );
};
