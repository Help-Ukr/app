import LocatingIcon from '@mui/icons-material/LocationSearching';
import LocatedIcon from '@mui/icons-material/MyLocation';
import Fab from '@mui/material/Fab';
import 'leaflet/dist/leaflet.css';
import { observer } from 'mobx-react-lite';
import { CSSProperties } from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { userMarkerIcon } from '~/lib/markers';
import { app } from '~/services/app';
import { DontationPointsService } from '~/services/donationpoints.service';
import { LocationService } from '~/services/location.service';
import { MapService } from '~/services/map.service';
import { useTr } from '~/texts';
import { DonationMarker } from './DonationMarker';

const styleMap: CSSProperties = { width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 0 };

const Map = observer(() => {
    const ptsvc = app.get(DontationPointsService).use();
    const map = app.get(MapService);
    const location = app.get(LocationService).use();
    const [tr] = useTr('map');

    return (
        <>
            <MapContainer
                style={styleMap}
                center={[52.5188239, 13.4012708]}
                zoom={13}
                scrollWheelZoom={true}
                zoomControl={false}
            >
                <map.Connect />
                <ZoomControl position="bottomright" />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {location.position && (
                    <Circle
                        center={[location.position.lat, location.position.lng]}
                        radius={location.position.hdop}
                        fill
                        stroke={false}
                        fillColor="lightblue"
                        fillOpacity={0.3}
                    />
                )}
                {ptsvc.filtered.map(pt => (
                    <DonationMarker key={pt.id} pt={pt} />
                ))}
                {location.position && (
                    <Marker position={[location.position.lat, location.position.lng]} icon={userMarkerIcon}>
                        <Popup>{tr('itsyou')}</Popup>
                    </Marker>
                )}
            </MapContainer>
            <Fab
                color={location.error ? 'error' : 'primary'}
                size="small"
                aria-label="locate"
                sx={{ position: 'fixed', right: 8, bottom: 128, zIndex: 100 }}
                onClick={() => {
                    location.refresh();
                    map.center();
                }}
            >
                {location.loading ? <LocatingIcon /> : <LocatedIcon />}
            </Fab>
        </>
    );
});

export default Map;
