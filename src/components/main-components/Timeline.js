import React from "react";
import "../styles/timeline.css";
import { TimelineTop } from "../build-components/TimelineTop";

const Timeline = ({ user }) => {
  console.log(user);
  return (
    <div className="timeline">
      <TimelineTop />
    </div>
  );
};

export default Timeline;
