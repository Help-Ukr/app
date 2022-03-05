import dynamic from "next/dynamic";
import React from "react";
import MapSidebar from "./MapSidebar";
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
        showReverseGeoCodedDisplayName: false,
      }}
      mode="fullscreen"
      onLocationSelected={() => {}}
      MapSidebar={MapSidebar}
    />
  );
};

export default MapWithLocations;
