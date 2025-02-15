import React, { useState, useEffect } from "react";

const images = [
  "/docs/images/carousel/carousel-1.svg",
  "/docs/images/carousel/carousel-2.svg",
  "/docs/images/carousel/carousel-3.svg",
  "/docs/images/carousel/carousel-4.svg",
  "/docs/images/carousel/carousel-5.svg",
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Carousel Wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              className="w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute z-30 flex space-x-2 bottom-5 left-1/2 transform -translate-x-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 z-30 p-3 bg-white/30 hover:bg-white/50 rounded-full"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 6 10"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M5 1L1 5l4 4" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 z-30 p-3 bg-white/30 hover:bg-white/50 rounded-full"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 6 10"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M1 9l4-4-4-4" />
        </svg>
      </button>
    </div>
  );
}
