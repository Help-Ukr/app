import { action, makeObservable, observable } from 'mobx';
import { useEffect } from 'react';
import { Service } from 'typedi';
import { GeoPosition } from '~/lib/types';
import { AsyncService } from './base.service';

@Service()
export class LocationService extends AsyncService {
    @observable.ref
    position?: GeoPosition = undefined;

    constructor() {
        super();
        makeObservable(this);
    }

    use() {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            this.refresh();
        }, []);
        return this;
    }

    refresh = () => {
        this.async(() =>
            Promise.all([
                new Promise<void>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(
                        ({ coords }) => {
                            this.setPosition({ hdop: coords.accuracy, lat: coords.latitude, lng: coords.longitude });
                            resolve();
                        },
                        err => {
                            this.log.error('NavigatorGeoError', err);
                            reject(new Error(err.message));
                        },
                    );
                }),
                fetch('http://ip-api.com/json?fields=status,message,lat,lon')
                    .then(r => r.json())
                    .then(
                        (r: any) => !this.position && this.setPosition({ hdop: 5000, lat: r.lat, lng: r.lon }),
                        err => this.log.error('GeoIPError', err),
                    ),
            ]),
        );
    };

    @action
    protected setPosition(pos: GeoPosition) {
        this.position = pos;
        this.log.info('Position changed', pos);
    }
}
