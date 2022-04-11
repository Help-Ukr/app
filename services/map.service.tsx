import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { Service } from 'typedi';
import { GeoPosition } from '~/lib/types';
import { BaseService } from './base.service';

@Service()
export class MapService extends BaseService {
    constructor() {
        super();
    }

    Connect = () => {
        const map = useMap();
        useEffect(() => {
            this.map = map;
            this.map.on('zoomend', () => (this.zoom = map.getZoom()));
            this.map.on('moveend', () => (this.centerPos = map.getCenter()));
            if (this.centerPos && this.zoom) this.map.setView(this.centerPos, this.zoom);
            return () => {
                this.map = undefined;
            };
        }, [map]);
        return null;
    };

    center = (pos: GeoPosition) => {
        this.map?.flyTo(pos, undefined, { duration: 1 });
    };

    private map?: L.Map;
    private zoom?: number;
    private centerPos?: L.LatLng;
}
