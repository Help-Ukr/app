import { useTheme } from '@mui/material';
import { Box } from '@mui/system';
import L from 'leaflet';
import { observer } from 'mobx-react-lite';
import { CSSProperties, FC, useEffect, useMemo, useRef } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { defaultMarker } from '~/components/Map';
import { SearchLocationModel } from '~/model/searchlocation.model';

const styleMap: CSSProperties = { width: '100%', height: 300 };

const FieldLocationMap: FC<{ locationModel: SearchLocationModel }> = observer(({ locationModel }) => {
    const theme = useTheme();
    return (
        <Box sx={{ color: theme.palette.primary.main, borderRadius: 1, overflow: 'hidden' }}>
            <MapContainer style={styleMap} zoom={13} center={locationModel.position}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <DraggableMarker locationModel={locationModel} />
            </MapContainer>
        </Box>
    );
});

const DraggableMarker: FC<{ locationModel: SearchLocationModel }> = observer(({ locationModel }) => {
    const markerRef = useRef<L.Marker>(null);
    const map = useMap();

    useEffect(() => {
        map.setView(locationModel.position);
    }, [locationModel.position, map]);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                marker && locationModel.reverse(marker.getLatLng());
            },
        }),
        [locationModel],
    );

    return (
        <Marker
            draggable
            ref={markerRef}
            icon={defaultMarker}
            eventHandlers={eventHandlers}
            position={locationModel.position}
        />
    );
});

export default FieldLocationMap;
