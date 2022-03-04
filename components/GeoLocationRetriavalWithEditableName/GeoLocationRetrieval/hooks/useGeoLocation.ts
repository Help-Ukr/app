import { useState } from "react";
import { Wgs84Location } from "../geo-utils";

export default function useGeoLocation() {
  const [state, setGeoState] = useState<
    "empty" | "loading" | "ready" | "error"
  >("empty");
  const [position, setPosition] = useState<Wgs84Location>();

  function retrieveLocation() {
    if (!navigator.geolocation) {
      setGeoState("error");
      return;
    }
    setGeoState("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoState("ready");
        setPosition({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        console.error("Error retrieving user location", err);
        setGeoState("error");
      }
    );
  }

  return {
    state,
    position,
    retrieveLocation,
  };
}
