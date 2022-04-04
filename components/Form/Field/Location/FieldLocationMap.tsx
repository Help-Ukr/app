import { useTheme } from '@mui/material';
import { Box } from '@mui/system';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { CSSProperties, FC, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

const styleMap: CSSProperties = { width: '100%', height: 300 };
const initialZoom = 13;
const currentLocation = {
    lat: 52.5188239,
    lng: 13.4012708,
};

const defaultMarker = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [13, 0],
});

const SearchField: FC<SearchFieldProps> = props => {
    const map = useMap();

    const provider = new OpenStreetMapProvider();

    const searchControl = GeoSearchControl({
        provider: provider,
        style: 'bar',
        marker: {
            icon: defaultMarker,
            draggable: true,
        },
        searchLabel: props.label,
    });

    const handleShowLocation = useCallback(
        (e: any) => {
            console.log('handleShowLocation', e);
            const { x, y } = e.location;
            props.onChange?.({ address: '', lat: x, lng: y });
        },
        [props],
    );
    const handleMarkerDrag = useCallback(
        (e: any) => {
            console.log('handleMarkerDrag', e);
            const { lat, lng } = e.location;
            props.onChange?.({ address: '', lat, lng });
        },
        [props],
    );

    useEffect(() => {
        map.addControl(searchControl);
        map.on('geosearch/showlocation', handleShowLocation);
        map.on('geosearch/marker/dragend', handleMarkerDrag);
        return () => {
            map.removeControl(searchControl);
        };
    }, [handleMarkerDrag, handleShowLocation, map, searchControl]);
    return <>{props.children}</>;
};

type SearchFieldProps = {
    label: string;
    onChange?: (value: { address: string; lat?: number; lng?: number }) => void;
};
const FieldLocationMap: FC<SearchFieldProps> = props => {
    const theme = useTheme();
    return (
        <Box sx={{ color: theme.palette.primary.main }}>
            <MapContainer style={styleMap} center={[currentLocation.lat, currentLocation.lng]} zoom={initialZoom}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <SearchField {...props} />
            </MapContainer>
        </Box>
    );
};

export default FieldLocationMap;
