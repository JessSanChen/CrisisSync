import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8000/tweets/0"; // Replace with actual disaster_id

export default function TweetGrid() {
  const [tweets, setTweets] = useState([]); // Store tweets from backend

  // Fetch tweets from backend when component mounts
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data); // Debugging: check JSON structure

        setTweets(data); // Store raw JSON data instead of Twitter embed URLs
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchTweets();
  }, []);

  return (
    <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      {tweets.length === 0 ? (
        <p className="text-center col-span-3 text-gray-500">Loading tweets...</p>
      ) : (
        tweets.map((tweet, index) => (
          <div key={index} className="flex flex-col bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <p className="text-sm text-gray-500">{new Date(tweet.time).toLocaleString()}</p>
            <p className="text-blue-600 font-semibold">{tweet.author}</p>
            <p className="text-gray-900 mt-2">{tweet.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
