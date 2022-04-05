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
        <Box sx={{ color: theme.palette.primary.main }}>
            <MapContainer
                style={styleMap}
                zoom={13}
                center={[locationModel.location?.lat || 0, locationModel.location?.lng || 0]}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <DraggableMarker locationModel={locationModel} />
            </MapContainer>
        </Box>
    );
});

const DraggableMarker: FC<{ locationModel: SearchLocationModel }> = observer(({ locationModel }) => {
    const markerRef = useRef<L.Marker>(null);
    const map = useMap();
    const position = locationModel.location || locationModel.defaultMapLocation;
    useEffect(() => {
        map.setView(position);
    }, [position, map]);

    const eventHandlers = useMemo(
        () => ({
            async dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    const p = marker.getLatLng();
                    await locationModel.reverse(p);
                }
            },
        }),
        [locationModel],
    );

    return <Marker icon={defaultMarker} draggable eventHandlers={eventHandlers} position={position} ref={markerRef} />;
});

export default FieldLocationMap;
