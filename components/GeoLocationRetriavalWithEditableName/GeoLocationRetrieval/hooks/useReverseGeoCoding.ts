import { useState } from "react";
import {
  createReverseGeocodeUrl,
  ReverseGeoCodingResult,
  Wgs84Location,
} from "../geo-utils";
import useGetRequest from "./useGetRequest";

export default function useReverseGeoCoding() {
  const [currentLocation, reverseGeoCode] = useState<Wgs84Location>();

  const url = currentLocation
    ? createReverseGeocodeUrl(currentLocation)
    : undefined;

  const getRequest = useGetRequest<ReverseGeoCodingResult>(url);
  return { reverseGeoCode, ...getRequest };
}
