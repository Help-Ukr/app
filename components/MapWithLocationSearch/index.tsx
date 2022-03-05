import React, { ComponentProps, useEffect, useState } from "react";
import PinIcon from "@mui/icons-material/GpsFixedOutlined";

import "leaflet/dist/leaflet.css";

import useGeoLocation from "./hooks/useGeoLocation";
import useReverseGeoCoding from "./hooks/useReverseGeoCoding";
import { extractStreetName, extragWgsPosition } from "./geo-utils";
import useGeoCoding from "./hooks/useGeoCoding";
import { Wgs84Location } from "./geo-utils";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  ZoomControl,
} from "react-leaflet";
import { DragEndEvent, Icon } from "leaflet";

import {
  Autocomplete,
  Box,
  CircularProgress,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const mapIcon = new Icon({
  iconUrl: "/images/map_pin.svg",
  iconAnchor: [12, 41],
});

/**
 * Turns a long location name into a small,
 * easy digestable one.
 * Turned off  for now.
 */
function sanitizeLocationName(location: string) {
  return location;
}

export interface LocationSelectValue {
  label: string;
  value: Wgs84Location;
}

interface Props {
  /**
   * Defaults to true.
   * Turns a long location name into a small,
   * easy digestable one
   */
  sanitizeLocationName?: boolean;
  onLocationSelected: (selectValue: LocationSelectValue) => void;
  mode?: "fullscreen" | "inline";
  options?: {
    /**
     * If false, no drag and drop marker,
     * which can be used to set the location,
     * is shown on the map.
     */
    markerForPositionDetermination?: boolean;
    /**
     * Default: 13
     */
    initialZoom?: number;
    /**
     * If true, the user's GPS location
     * is automatically requested.
     */
    autoSetUserLocation?: boolean;
  };
}

interface MapApiProps {
  currentLocation?: Wgs84Location;
}

/**
 * This component is needed
 * because useMap is only available
 * inside the MapContainer, which
 * is a Context Provider
 */
const MapApi: React.FC<MapApiProps> = ({ currentLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (currentLocation) {
      map.setView([currentLocation.lat, currentLocation.lon]);
    }
  }, [currentLocation, map]);

  return <></>;
};

const INITIAL_MAP_CENTER: Wgs84Location = {
  lat: 52.5188239,
  lon: 13.4012708,
};

const MapWithLocationSearch = ({
  onLocationSelected,
  sanitizeLocationName: shouldSanitizeLocationName = true,
  mode = "inline",
  options: cmpOptions = {},
}: Props) => {
  const {
    initialZoom = 13,
    markerForPositionDetermination = true,
    autoSetUserLocation,
  } = cmpOptions;

  const [locationSearchTerm, setLocationSearchTerm] = useState<string>();
  const [autocompleteOpen, setAutoCompleteOpen] = useState<boolean>(false);
  const {
    state,
    position: userGeoPosition,
    retrieveLocation,
  } = useGeoLocation();

  useEffect(() => {
    if (autoSetUserLocation) {
      retrieveLocation();
    }
  }, [autoSetUserLocation]);

  const [currentLocation, setCurrentLocation] =
    useState<Wgs84Location>(INITIAL_MAP_CENTER);
  const [selectValue, setSelectValue] = useState<LocationSelectValue>();

  const {
    state: reverseGeoCodingState,
    result: reverseGeoCodedUserLocation,
    reverseGeoCode,
  } = useReverseGeoCoding();
  const { state: geoCodingState, result: geoCodingResult } =
    useGeoCoding(locationSearchTerm);

  const optionsLoading =
    geoCodingState === "loading" || reverseGeoCodingState === "loading";

  // if user geo location is known, reverse geo code it's location to get it's name
  useEffect(() => {
    if (userGeoPosition) {
      reverseGeoCode(userGeoPosition);
    }
  }, [userGeoPosition]);

  const townName = reverseGeoCodedUserLocation
    ? extractStreetName(reverseGeoCodedUserLocation.address) ||
      reverseGeoCodedUserLocation.display_name
    : undefined;

  const reverseWgsPosition = reverseGeoCodedUserLocation
    ? extragWgsPosition(reverseGeoCodedUserLocation)
    : undefined;

  // Set town name retrieved by GeoLocation API
  // as selected value if defined
  useEffect(() => {
    if (!townName || !reverseWgsPosition) return;
    setSelectValue({
      value: reverseWgsPosition,
      label: townName,
    });
  }, [townName]);

  useEffect(() => {
    if (selectValue?.value) {
      setCurrentLocation(selectValue.value);
    }
  }, [selectValue?.value]);

  let options: LocationSelectValue[] =
    geoCodingResult?.map((result) => ({
      label: result.display_name,
      value: extragWgsPosition(result),
    })) ?? [];

  if (townName && reverseWgsPosition) {
    options = [
      {
        value: reverseWgsPosition,
        label: townName,
      },
      ...options,
    ];
  }

  function onMarkerDragend(e: DragEndEvent) {
    const targetLocation = e.target.getLatLng() as { lat: number; lng: number };
    const markerCoords: Wgs84Location = {
      lat: targetLocation.lat,
      lon: targetLocation.lng,
    };
    reverseGeoCode(markerCoords);
    setCurrentLocation(markerCoords);
  }

  useEffect(() => {
    if (selectValue) {
      // sanitize location name
      let label = selectValue.label;
      if (shouldSanitizeLocationName) {
        label = sanitizeLocationName(selectValue.label);
      }
      onLocationSelected({
        ...selectValue,
        label,
      });
    }
  }, [selectValue?.label, selectValue?.value.lat, selectValue?.value.lon]);

  let locationRetrievalPinColor: ComponentProps<typeof PinIcon>["color"] =
    "primary";
  if (state === "ready") {
    locationRetrievalPinColor = "success";
  }
  if (state === "error") {
    locationRetrievalPinColor = "error";
  }

  return (
    <Box
      sx={
        mode === "fullscreen"
          ? {
              position: "absolute",
              width: "100%",
              height: "calc(100vh - 65px)",
              top: "65px",
            }
          : undefined
      }
    >
      <div style={{ position: "relative" }}>
        <Box
          sx={
            mode === "fullscreen"
              ? {
                  position: "absolute",
                  top: 1,
                  zIndex: 10,
                  width: "30%",
                }
              : undefined
          }
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              p: mode === "fullscreen" ? 2 : 0,
            }}
          >
            <IconButton onClick={retrieveLocation}>
              <PinIcon
                color={locationRetrievalPinColor}
                sx={{
                  opacity:
                    state === "loading" || reverseGeoCodingState === "loading"
                      ? 0.5
                      : 1,
                }}
              />
            </IconButton>
            <Paper sx={{ width: "100%" }}>
              <Autocomplete
                id="place-autocomplete"
                open={autocompleteOpen}
                fullWidth
                onOpen={() => {
                  setAutoCompleteOpen(true);
                }}
                onClose={() => {
                  setAutoCompleteOpen(false);
                }}
                isOptionEqualToValue={(option, value) =>
                  JSON.stringify(option) === JSON.stringify(value)
                }
                filterOptions={(x) => x}
                getOptionLabel={(option) => option.label}
                options={options}
                loading={optionsLoading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search location.."
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {optionsLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
                onInputChange={(_, val) => {
                  if (val) {
                    setLocationSearchTerm(val);
                  }
                }}
                onChange={(_, val) => {
                  if (val) {
                    setSelectValue(val);
                  }
                }}
              />
            </Paper>
          </Box>
          {townName && (
            <Typography
              component="p"
              variant="caption"
              sx={{ textAlign: "center", mt: 1 }}
            >
              {townName}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            top: 0,
            left: 0,
            width: "100%",
            height: mode === "fullscreen" ? "calc(100vh - 65px)" : "18rem",
            zIndex: 0,
            borderRadius: mode === "fullscreen" ? undefined : 2,
            overflow: "hidden",
            mt: mode === "fullscreen" ? undefined : 1,
            position: mode === "fullscreen" ? "absolute" : undefined,
          }}
        >
          <MapContainer
            style={{ height: "100%" }}
            center={[currentLocation.lat, currentLocation.lon]}
            zoom={initialZoom}
            scrollWheelZoom={mode === "fullscreen"}
            zoomControl={false}
            attributionControl={false}
          >
            <ZoomControl position="bottomleft" />
            <MapApi currentLocation={currentLocation} />
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markerForPositionDetermination && (
              <Marker
                eventHandlers={{ dragend: onMarkerDragend }}
                draggable
                position={[currentLocation.lat, currentLocation.lon]}
                icon={mapIcon}
              />
            )}
          </MapContainer>
        </Box>
      </div>
    </Box>
  );
};

export default MapWithLocationSearch;
