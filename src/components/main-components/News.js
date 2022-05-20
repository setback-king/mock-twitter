import React, { useEffect, useState } from "react";
import "../styles/explore.css";
import { NewsItem } from "../build-components/NewsItem";

function News() {
  const [categoryUrl, setCategoryUrl] = useState("world");
  const [categoryNews, setCategoryNews] = useState([]);

  const api = process.env.REACT_APP_API_KEY;

  const changeCategory = (text) => {
    if (text === "World") {
      setCategoryUrl("world");
    } else if (text === "Sports") {
      setCategoryUrl("sports");
    } else if (text === "Entertainment") {
      setCategoryUrl("entertainment");
    } else setCategoryUrl("politics");
  };

  useEffect(() => {
    fetch(
      `https://newsdata.io/api/1/news?apikey=${api}&country=us&category=${categoryUrl}`
    )
      .then((response) => response.json())
      .then((data) => setCategoryNews(data.results));
  }, [categoryUrl]);

  const newsElements = categoryNews.map((news, index) => {
    return (
      <NewsItem
        styles={{ fontSize: "17px" }}
        key={index}
        title={news.title}
        pubDate={news.pubDate}
        image_url={news.image_url}
        category={news.category}
      />
    );
  });

  return (
    <div className="explore">
      <h1>#Explore</h1>
      <header className="news--links">
        <div
          onClick={(e) => changeCategory(e.target.textContent)}
          className="categories"
        >
          World
        </div>
        <div
          onClick={(e) => changeCategory(e.target.textContent)}
          className="categories"
        >
          Sports
        </div>
        <div
          onClick={(e) => changeCategory(e.target.textContent)}
          className="categories"
        >
          Entertainment
        </div>
        <div
          onClick={(e) => changeCategory(e.target.textContent)}
          className="categories"
        >
          Politics
        </div>
      </header>
      <h3 style={{ fontStyle: "italic" }}>{categoryUrl.toUpperCase()}</h3>
      {newsElements}
    </div>
  );
}

export default News;
