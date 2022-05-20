import React from "react";
import "../styles/newsItem.css";

export const NewsItem = ({
  title,
  image_url,
  category,
  pubDate,
  styles,
  dates,
}) => {
  const newPub = pubDate.substr(0, 10);

  return (
    <div className="newsItem">
      <div className="newsInfo">
        <div
          style={{
            display: "flex",
            gap: "10px",
            fontSize: "12px",
            color: "gray",
          }}
        >
          <span>{category}</span>-<span>{newPub}</span>
        </div>
        <p style={styles} className="title">
          {title}
        </p>
      </div>
      {image_url && <img className="newsImage" src={image_url} alt="" />}
    </div>
  );
};
