import { autorun } from 'mobx';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { Service } from 'typedi';
import { GeoPosition } from '~/lib/types';
import { BaseService } from './base.service';
import { LocationService } from './location.service';

@Service()
export class MapService extends BaseService {
    constructor(private location: LocationService) {
        super();
    }

    Connect = () => {
        const map = useMap();
        useEffect(() => {
            this.map = map;
            const dispose = autorun(() => this.center());
            return () => {
                dispose();
                this.map = undefined!;
            };
        }, [map]);
        return null;
    };

    center = (pos?: GeoPosition) => {
        pos ??= this.location.position;
        pos && this.map.flyTo(pos, undefined, { duration: 1 });
    };

    private map!: L.Map;
}
