import React, { useEffect, useState } from "react";
import "../styles/sidebar.css";
import { NewsItem } from "../build-components/NewsItem";

function Sidebar() {
  const [newsInfo, setNewsInfo] = useState([]);

  const search = () => {
    console.log("gg");
  };

  const api = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    fetch(`https://newsdata.io/api/1/news?apikey=${api}&country=us`)
      .then((response) => response.json())
      .then((data) => setNewsInfo(data.results));
  }, []);

  console.log(newsInfo.length);

  const newsElements = newsInfo.map((news) => {
    return (
      <NewsItem
        title={news.title}
        pubDate={news.pubDate}
        image_url={news.image_url}
        category={news.category}
      />
    );
  });

  return (
    <div className="sidebar">
      <div className="input-icons">
        <i
          onClick={search}
          style={{ color: "gray" }}
          className="fa fa-search icon"
        ></i>
        <input
          className="input-field"
          type="text"
          placeholder="Search Twitter"
        ></input>
      </div>
      <div className="news">
        <h3 style={{ marginLeft: "15px" }}>What's Happening</h3>
        {newsElements}
      </div>
    </div>
  );
}

export default Sidebar;
