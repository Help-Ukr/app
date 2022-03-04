import { Address, GeoCodingResult, Wgs84Location } from "./types";

function appendIfDefined(
  currStr: string,
  separator: string = " ",
  newStr?: string
) {
  if (!currStr && newStr) return newStr;
  if (newStr) {
    return `${currStr}${separator}${newStr}`;
  }
  return currStr;
}

export function extractStreetName(address: Address) {
  let str = address.road || "";
  if (address.road) {
    str = appendIfDefined(str, ", ", address.house_number);
  }

  const placeNameToUse =
    address.city ||
    address.village ||
    address.hamlet ||
    address.place ||
    address.town ||
    address.farm ||
    address.municipality ||
    address.county;

  str = appendIfDefined(str, placeNameToUse);

  return str;
}

export function extragWgsPosition(result: GeoCodingResult) {
  return {
    lat: parseFloat(result.lat),
    lon: parseFloat(result.lon),
  };
}

/**
 * Returns distance between two points in
 * meters
 */
export function calculateDistance(
  point1: Wgs84Location,
  point2: Wgs84Location
) {
  const { lat: lat1, lon: lon1 } = point1;
  const { lat: lat2, lon: lon2 } = point2;

  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres

  return d;
}
