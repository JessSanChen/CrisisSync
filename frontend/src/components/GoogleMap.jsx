import React, { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function GoogleMap({ tweetLocations }) {
  const [geoLocations, setGeoLocations] = useState([]);

  useEffect(() => {
    async function geocodeLocations() {
        console.log(tweetLocations);
      if (!tweetLocations || tweetLocations.length === 0) return;

      const geocodedData = await Promise.all(
        tweetLocations.map(async (location) => {
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                location
              )}&key=AIzaSyARXL4ZQ-Mll9YXKRtJlPyKY6b60CyNjeI`
            );
            const data = await response.json();
            if (data.results.length > 0) {
              return {
                lat: data.results[0].geometry.location.lat,
                lng: data.results[0].geometry.location.lng,
              };
            }
          } catch (error) {
            console.error("Geocoding error:", error);
          }
          return null;
        })
      );

      setGeoLocations(geocodedData.filter((loc) => loc)); // Remove nulls
    }

    geocodeLocations();
  }, [tweetLocations]);

  return (
    <APIProvider apiKey={"AIzaSyARXL4ZQ-Mll9YXKRtJlPyKY6b60CyNjeI"}>
      <Map
        style={{ width: "100%", height: "500px" }}
        defaultZoom={10}
        defaultCenter={{ lat: 34.0522, lng: -118.2437 }} 
      >
        {geoLocations.map((position, index) => (
          <Marker key={index} position={position} />
        ))}
      </Map>
    </APIProvider>
  );
}
