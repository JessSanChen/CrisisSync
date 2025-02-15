import React from "react";
import { Tweet } from "react-twitter-widgets";

const TweetEmbed = ({ tweetId }) => {
  return (
    <div className="flex justify-center my-4">
      <Tweet tweetId={tweetId} />
    </div>
  );
};

export default TweetEmbed;