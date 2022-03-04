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
    <MapWithLocationSearch mode="fullscreen" onLocationSelected={() => {}} />
  );
};

export default MapWithLocations;
