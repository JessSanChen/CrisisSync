import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8000/tweets/0"; // Replace with actual disaster_id

export default function TweetGrid() {
  const [tweets, setTweets] = useState([]); // State to store tweets from the backend

  // Fetch tweets from backend when component mounts
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch(API_URL, { mode: 'no-cors'});
        const data = await response;
        console.log(data);

        // Convert tweet IDs into valid Twitter embed URLs
        const tweetUrls = data.map((tweet) => `https://twitter.com/i/web/status/${tweet.id}`);

        setTweets(tweetUrls);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchTweets();
  }, []);

  // Ensure Twitter embeds reload after tweets update
  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load();
    }
  }, [tweets]);

  return (
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {tweets.length === 0 ? (
        <p className="text-center col-span-3 text-gray-500">Loading tweets...</p>
      ) : (
        tweets.map((tweetUrl, index) => (
          <div key={index} className="flex max-w-xl flex-col items-start justify-between bg-white p-4 rounded-lg shadow-md">
            <blockquote className="twitter-tweet">
              <a href={tweetUrl}></a>
            </blockquote>
          </div>
        ))
      )}
    </div>
  );
}
