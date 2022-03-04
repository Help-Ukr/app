export interface Address {
  house_number?: string;
  road?: string;
  city_district?: string;
  town?: string;
  municipality?: string;
  county?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
  village?: string;
  farm?: string;
  place?: string;
  city?: string;
  hamlet?: string;
}

interface GeoCodingResultBase {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  boundingbox: string[];
}

export interface GeoCodingResult extends GeoCodingResultBase {}

export interface ReverseGeoCodingResult extends GeoCodingResultBase {
  address: Address;
}

export interface Wgs84Location {
  lat: number;
  lon: number;
}

export interface Osm3s {
  timestamp_osm_base: Date;
  copyright: string;
}

export interface Tags {
  amenity: string;
  brand: string;
  "brand:wikidata": string;
  "brand:wikipedia": string;
  name: string;
  operator: string;
  "ref:mise": string;
  "fuel:diesel": string;
  "fuel:lpg": string;
  "fuel:octane_95": string;
  "fuel:octane_98": string;
  "addr:city": string;
  "addr:city:de": string;
  "addr:city:it": string;
  "addr:housenumber": string;
  "addr:postcode": string;
  "addr:street": string;
  "addr:street:de": string;
  "addr:street:it": string;
  shop: string;
  "fuel:cng": string;
  "fuel:octane_91": string;
  opening_hours: string;
  "operator:de": string;
  "operator:it": string;
  phone: string;
}

export interface Element {
  type: string;
  id: any;
  lat: number;
  lon: number;
  tags: Tags;
}

export interface OverpassResponse {
  version: number;
  generator: string;
  osm3s: Osm3s;
  elements: Element[];
}
