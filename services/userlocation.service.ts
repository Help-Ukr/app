import { action, makeObservable, observable } from 'mobx';
import { useEffect } from 'react';
import { Service } from 'typedi';
import type { GeoPosition } from '~/lib/types';
import { AsyncService } from './base.service';
import { EnvService } from './env.service';

@Service()
export class UserLocationService extends AsyncService {
    @observable.ref
    position?: GeoPosition = undefined;

    constructor(private env: EnvService) {
        super();
        makeObservable(this);
    }

    use = () => {
        useEffect(() => {
            this.refresh();
        }, []);
        return this;
    };

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
                fetch(`/api/geoip`)
                    .then(r => (r.status === 200 ? r.json() : null))
                    .then(
                        (r: any) => r && !this.position && this.setPosition(r),
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
