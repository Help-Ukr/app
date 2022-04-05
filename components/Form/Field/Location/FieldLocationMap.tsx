import { useTheme } from '@mui/material';
import { Box } from '@mui/system';
import L from 'leaflet';
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { defaultMarker } from '~/components/Map';
import { FieldLocationValue } from '.';

const styleMap: CSSProperties = { width: '100%', height: 300 };

const FieldLocationMap: FC<{ value: FieldLocationValue; onChange: (value: FieldLocationValue) => void }> = ({
    onChange,
    value,
}) => {
    const theme = useTheme();
    return (
        <Box sx={{ color: theme.palette.primary.main }}>
            <MapContainer style={styleMap} zoom={13} center={[value.lat, value.lng]}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <DraggableMarker initPosition={value} onChange={p => onChange({ ...p, address: value.address })} />
            </MapContainer>
        </Box>
    );
};

const DraggableMarker: FC<{
    initPosition: { lat: number; lng: number };
    onChange: (p: { lat: number; lng: number }) => void;
}> = ({ initPosition, onChange }) => {
    const [position, setPosition] = useState(initPosition);
    const markerRef = useRef<L.Marker>(null);
    const map = useMap();

    useEffect(() => {
        const marker = markerRef.current;
        if (marker) {
            marker?.setLatLng(initPosition);
            map.setView(initPosition);
            setPosition(initPosition);
        }
    }, [initPosition, map]);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    const p = marker.getLatLng();
                    setPosition(p);
                    onChange(p);
                }
            },
        }),
        [onChange],
    );

    return <Marker icon={defaultMarker} draggable eventHandlers={eventHandlers} position={position} ref={markerRef} />;
};

export default FieldLocationMap;
