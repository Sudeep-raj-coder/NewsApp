import React, { useState, useEffect } from "react";
import NewsItems from "./NewsItems";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home(props) {
  let [articles, setArticles] = useState([]);
  let [totalResults, setTotalResults] = useState(0);
  let [page, setPage] = useState(1);
  let [error, setError] = useState(false);

  async function getAPIData() {
    var response = "";
    try {
      if (props.search)
        response = await fetch(
          `https://newsapi.org/v2/everything?page=1&q=${props.search}&language=${props.language}&pageSize=20&apiKey=913b235b47544335b2ddae642216136b`,
        );
      else
        response = await fetch(
          `https://newsapi.org/v2/everything?page=1&q=${props.q}&language=${props.language}&pageSize=20&apiKey=913b235b47544335b2ddae642216136b`,
        );

      response = await response.json();

      if (response.articles) {
        setArticles(response.articles);
        setTotalResults(response.totalResults);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  }

  var fetchMoreData = async () => {
    setPage(page + 1);
    var response = "";
    try {
      if (props.search) {
        response = await fetch(
          `https://newsapi.org/v2/everything?page=${page + 1}&q=${props.search || props.q}&language=${props.language}&pageSize=20&apiKey=913b235b47544335b2ddae642216136b`,
        );
      } else {
        response = await fetch(
          `https://newsapi.org/v2/everything?page=${page + 1}&q=${props.q}&language=${props.language}&pageSize=20&apiKey=913b235b47544335b2ddae642216136b`,
        );
      }
      response = await response.json();
      if (response.articles) {
        setArticles(prev => [...prev, ...(response.articles || []).filter(item => item)]);
      }
    } catch (error) {
      // fail silently on scroll load
    }
  };

  useEffect(() => {
    getAPIData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  if (error) {
    return (
      <div className="container-fluid text-center mt-5">
        <h5 className="text-light">
          News data is temporarily unavailable in this environment.
        </h5>
        <p className="text-secondary">
          (NewsAPI free tier restricts requests from live/production domains — this works fully on localhost.)
        </p>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <h5 className="background p-2 text-center text-light mt-1">
        {props.search ? props.search : props.q}
      </h5>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<h4 className="text-center">Loading...</h4>}
      >
        <div className="row">
          {articles.filter(item => item).map((item, index) => (
            <NewsItems
              key={index}
              title={item?.title ? item.title.slice(0, 80) + "..." : "No Title"}
              description={item?.description || "No Description"}
              pic={item?.urlToImage}
              url={item?.url}
              source={item?.source?.name || "Unknown"}
              date={item?.publishedAt}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}