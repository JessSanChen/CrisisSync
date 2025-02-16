import React, { useEffect, useState, useRef } from "react";
import { Tweet } from "react-twitter-widgets";

const API_URL = "http://localhost:8000/tweets/0"; // Replace with actual disaster_id

export default function TweetGrid({ setTweetLocations }) {
  const [tweets, setTweets] = useState([]); // Store tweets from backend
  const [startIndex, setStartIndex] = useState(0); // Track current tweet batch
  const [fadeIn, setFadeIn] = useState(true); // Track fade animation
  const tweetContainerRef = useRef(null); // Reference to maintain height
  
    useEffect(() => {
      const fetchTweets = async () => {
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          console.log("Fetched Tweets:", data);
  
          setTweets(data);
  
          // Extract unique locations from tweets
          const locations = data
            .map((tweet) => tweet.location)
            .filter((loc) => loc); // Remove empty locations
  
          setTweetLocations(locations); // Pass locations to the parent component
        } catch (error) {
          console.error("Error fetching tweets:", error);
        }
      };
  
      fetchTweets();
    }, []);

  // Rotate tweets every 5 seconds with fade animation
  useEffect(() => {
    if (tweets.length === 0) return; // Ensure tweets exist before starting rotation

    const interval = setInterval(() => {
      setFadeIn(false); // Start fade out
      setTimeout(() => {
        setStartIndex((prevIndex) => (prevIndex + 3) % tweets.length);
        setFadeIn(true); // Start fade in after new tweets load
      }, 1500); // Extended fade transition time (1.5s)
    }, 7500);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [tweets]);

  return (
    <div
      ref={tweetContainerRef} // Maintain height of this section
      className={`mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 
        transition-opacity duration-[1500ms] ${fadeIn ? "opacity-100" : "opacity-0"}`}
      style={{ minHeight: "700px" }} // Ensures a fixed minimum height
    >
      {tweets.length === 0 ? (
        <p className="text-center col-span-3 text-gray-500">Loading tweets...</p>
      ) : (
        tweets.slice(startIndex, startIndex + 3).map((tweet) => (
          <div key={tweet.id} className="flex justify-center">
            <Tweet tweetId={tweet.id.toString()} />
          </div>
        ))
      )}
    </div>
  );
}
