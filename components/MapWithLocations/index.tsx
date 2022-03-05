import dynamic from "next/dynamic";
import React from "react";
const MapWithLocationSearch = dynamic(
  () => import("../MapWithLocationSearch"),
  {
    ssr: false,
  }
);

type Props = {};

const MapWithLocations = (props: Props) => {
  return (
    <MapWithLocationSearch
      options={{
        initialZoom: 13,
        markerForPositionDetermination: false,
        autoSetUserLocation: true,
      }}
      mode="fullscreen"
      onLocationSelected={() => {}}
    />
  );
};

export default MapWithLocations;
