import { useEffect, useState } from "react";
import useGetRequest from "./useGetRequest";
import { createGeocodeUrl, GeoCodingResult } from "../geo-utils";

export default function useGeoCoding(searchTerm?: string) {
  const [url, setUrl] = useState<string | undefined>(
    createGeocodeUrl(searchTerm)
  );

  // Apply throttling
  const THROTTLE_MS = 230;
  useEffect(() => {
    if (!searchTerm) return;
    let timeout: number | undefined = undefined;
    let didCancel = true;

    if (url) {
      timeout = window.setTimeout(() => {
        setUrl(createGeocodeUrl(searchTerm));
      }, THROTTLE_MS);
    } else {
      setUrl(createGeocodeUrl(searchTerm));
    }

    return () => {
      didCancel = false;
      if (timeout !== undefined) {
        window.clearTimeout(timeout);
      }
    };
  }, [searchTerm]);

  return useGetRequest<GeoCodingResult[]>(url);
}
