import { Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { observer } from 'mobx-react-lite';
import { CSSProperties, FC, useEffect, useRef } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { donationMarkerIcon } from '~/lib/markers';
import { SearchLocationService } from '~/services/searchlocation.service';
import { useTr } from '~/texts';

const styleMap: CSSProperties = { width: '100%', height: 300 };

const FieldLocationMap: FC<{ locationSvc: Readonly<SearchLocationService> }> = observer(({ locationSvc }) => {
    const theme = useTheme();
    const [tr] = useTr('form');
    return (
        <>
            <Box sx={{ color: theme.palette.primary.main, borderRadius: 1, overflow: 'hidden' }}>
                <MapContainer style={styleMap} zoom={13} center={locationSvc.position}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <DraggableMarker locationSvc={locationSvc} />
                </MapContainer>
            </Box>
            <Box py={1}>
                <Typography textAlign="center" variant="caption" component="p" sx={{ fontStyle: 'italic' }}>
                    {tr('infoLatLng', { lat: locationSvc.position.lat, lon: locationSvc.position.lng })}
                </Typography>
            </Box>
        </>
    );
});

const DraggableMarker: FC<{ locationSvc: Readonly<SearchLocationService> }> = observer(({ locationSvc }) => {
    const markerRef = useRef<L.Marker>(null);
    const map = useMap();

    useEffect(() => {
        map.on('move', () => {
            const marker = markerRef.current;
            if (marker) {
                marker.setLatLng(map.getCenter());
                locationSvc.reverse(marker.getLatLng());
            }
        });
    }, [locationSvc, map]);

    useEffect(() => {
        map.setView(locationSvc.position);
    }, [locationSvc.position, map]);

    return <Marker ref={markerRef} icon={donationMarkerIcon} position={locationSvc.position} />;
});

export default FieldLocationMap;
