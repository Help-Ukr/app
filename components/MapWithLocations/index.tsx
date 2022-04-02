import dynamic from 'next/dynamic';
import React from 'react';
import { app } from '~/services/app';
import { DontationPointsService } from '~/services/donationpoints.service';
import MapSidebar from './MapSidebar';
const MapWithLocationSearch = dynamic(() => import('../MapWithLocationSearch'), {
    ssr: false,
});

type Props = {};

const MapWithLocations = (props: Props) => {
    const ptsvc = app.get(DontationPointsService).use();

    return (
        <MapWithLocationSearch
            options={{
                initialZoom: 13,
                markerForPositionDetermination: false,
                autoSetUserLocation: true,
                showReverseGeoCodedDisplayName: false,
            }}
            mode="fullscreen"
            onLocationSelected={() => {}}
            MapSidebar={MapSidebar}
        />
    );
};

export default MapWithLocations;
