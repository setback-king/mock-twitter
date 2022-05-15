import React from "react";
import "../styles/timeline.css";

const Timeline = ({ user }) => {
  console.log(user);
  return <div className="timeline">{user.email}</div>;
};

export default Timeline;
