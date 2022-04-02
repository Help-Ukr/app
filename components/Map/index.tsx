import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CSSProperties } from 'react';
import { MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import { COLLECTION_POINTS } from '~/api-client';

const defaultMarker = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [13, 0],
});

const styleMap: CSSProperties = { width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 0 };

const initialZoom = 13;
const currentLocation = {
    lat: 52.5188239,
    lng: 13.4012708,
};

const Map = () => {
    return (
        <MapContainer
            style={styleMap}
            center={[currentLocation.lat, currentLocation.lng]}
            zoom={initialZoom}
            scrollWheelZoom={true}
            zoomControl={false}
        >
            <ZoomControl position="bottomright" />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {COLLECTION_POINTS.map((p, i) => (
                <Marker key={i} position={[p.location.lat, p.location.lng]} icon={defaultMarker} />
            ))}
        </MapContainer>
    );
};

export default Map;
