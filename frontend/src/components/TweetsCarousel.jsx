import React from "react";
import Slider from "react-slick";

// const tweets = [
//   "https://twitter.com/Twitter/status/1456342178724872196",
//   "https://twitter.com/verge/status/1683667815463792641",
//   "https://twitter.com/SpaceX/status/1691929151748083735",
//   "https://twitter.com/NASA/status/1700187398395088893",
// ];

const messages = [
  "🚀 AI-powered automation is the future!",
  "🔥 Stay ahead with cutting-edge technology!",
  "🌎 Disaster response AI can save lives!",
  "💡 Innovation is the key to progress!",
];

export default function TweetCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-center text-2xl font-bold mb-6">Latest Updates</h2>
      <Slider {...settings}>
        {messages.map((msg, index) => (
          <div key={index} className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
            <p className="text-xl font-semibold text-gray-800">{msg}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}