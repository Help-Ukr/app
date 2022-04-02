import PinIcon from '@mui/icons-material/GpsFixedOutlined';
import { Autocomplete, Box, CircularProgress, IconButton, TextField, Typography } from '@mui/material';
import { DragEndEvent, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { ComponentProps, useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import { extractStreetName, extragWgsPosition, Wgs84Location } from './geo-utils';
import useGeoCoding from './hooks/useGeoCoding';
import useGeoLocation from './hooks/useGeoLocation';
import useReverseGeoCoding from './hooks/useReverseGeoCoding';

const mapIcon = new Icon({
    iconUrl: '/images/map_pin.svg',
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

export interface MapSidebarProps {
    children: JSX.Element;
}

const DefaultSidebar: React.FC<MapSidebarProps> = ({ children }) => children;

interface Props {
    /**
     * Defaults to true.
     * Turns a long location name into a small,
     * easy digestable one
     */
    sanitizeLocationName?: boolean;
    onLocationSelected: (selectValue: LocationSelectValue) => void;
    mode?: 'fullscreen' | 'inline';
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
        /**
         * Defaults to true
         */
        showReverseGeoCodedDisplayName?: boolean;
    };
    MapSidebar?: React.FC<MapSidebarProps>;
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
    mode = 'inline',
    options: cmpOptions = {},
    MapSidebar = DefaultSidebar,
}: Props) => {
    const {
        initialZoom = 13,
        markerForPositionDetermination = true,
        autoSetUserLocation,
        showReverseGeoCodedDisplayName = true,
    } = cmpOptions;

    const [locationSearchTerm, setLocationSearchTerm] = useState<string>();
    const [autocompleteOpen, setAutoCompleteOpen] = useState<boolean>(false);
    const { state, position: userGeoPosition, retrieveLocation } = useGeoLocation();

    useEffect(() => {
        if (autoSetUserLocation) {
            retrieveLocation();
        }
    }, [autoSetUserLocation]);

    const [currentLocation, setCurrentLocation] = useState<Wgs84Location>(INITIAL_MAP_CENTER);
    const [selectValue, setSelectValue] = useState<LocationSelectValue>();

    const { state: reverseGeoCodingState, result: reverseGeoCodedUserLocation, reverseGeoCode } = useReverseGeoCoding();
    const { state: geoCodingState, result: geoCodingResult } = useGeoCoding(locationSearchTerm);

    const optionsLoading = geoCodingState === 'loading' || reverseGeoCodingState === 'loading';

    // if user geo location is known, reverse geo code it's location to get it's name
    useEffect(() => {
        if (userGeoPosition) {
            reverseGeoCode(userGeoPosition);
        }
    }, [userGeoPosition]);

    const townName = reverseGeoCodedUserLocation
        ? extractStreetName(reverseGeoCodedUserLocation.address) || reverseGeoCodedUserLocation.display_name
        : undefined;

    const reverseWgsPosition = reverseGeoCodedUserLocation ? extragWgsPosition(reverseGeoCodedUserLocation) : undefined;

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
        geoCodingResult?.map(result => ({
            label: result.display_name,
            value: extragWgsPosition(result),
        })) ?? [];

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
    }, [onLocationSelected, selectValue, shouldSanitizeLocationName]);

    let locationRetrievalPinColor: ComponentProps<typeof PinIcon>['color'] = 'primary';
    if (state === 'ready') {
        locationRetrievalPinColor = 'success';
    }
    if (state === 'error') {
        locationRetrievalPinColor = 'error';
    }

    return (
        <Box>
            <Box
                sx={
                    mode === 'fullscreen'
                        ? {
                              position: 'absolute',
                              top: 1,
                              zIndex: 10,
                              width: {
                                  md: '25%',
                                  xs: '100%',
                              },
                              minWidth: {
                                  md: '420px',
                              },
                          }
                        : undefined
                }
            >
                <MapSidebar>
                    <Box sx={{ p: 1, pb: 2 }}>
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
                            isOptionEqualToValue={(option, value) => JSON.stringify(option) === JSON.stringify(value)}
                            filterOptions={x => x}
                            getOptionLabel={option => option.label}
                            options={options}
                            loading={optionsLoading}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="Search location..."
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {optionsLoading ? <CircularProgress color="inherit" size={16} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                        startAdornment: (
                                            <IconButton onClick={retrieveLocation}>
                                                <PinIcon
                                                    color={locationRetrievalPinColor}
                                                    sx={{
                                                        opacity:
                                                            state === 'loading' || reverseGeoCodingState === 'loading'
                                                                ? 0.5
                                                                : 1,
                                                    }}
                                                />
                                            </IconButton>
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
                    </Box>
                </MapSidebar>
                {showReverseGeoCodedDisplayName && townName && (
                    <Typography component="p" variant="caption" sx={{ textAlign: 'center', mt: 1 }}>
                        {townName}
                    </Typography>
                )}
            </Box>

            <MapContainer
                style={{ height: 'calc(100vh - 64px)', zIndex: 0 }}
                center={[currentLocation.lat, currentLocation.lon]}
                zoom={initialZoom}
                scrollWheelZoom={mode === 'fullscreen'}
                zoomControl={false}
                attributionControl={false}
            >
                <ZoomControl position="bottomright" />
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
    );
};

export default MapWithLocationSearch;
