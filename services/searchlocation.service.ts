import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { useEffect, useMemo } from 'react';
import { Service } from 'typedi';
import { Nominatim } from '~/lib/nominatim';

export type SearchLocation = {
    address: Exclude<Nominatim.SearchResultItem['address'], undefined>;
    osm_id: number;
    display_name: string;
    latitude: number;
    longitude: number;
};

@Service()
export class SearchLocationService {
    readonly nominatim = new Nominatim();
    readonly defaultMapLocation = {
        latitude: 52.5188239,
        longitude: 13.4012708,
    };

    @observable
    location?: SearchLocation;

    @observable.ref
    locationList: SearchLocation[] = [];

    constructor() {
        makeObservable(this);
    }

    @computed
    get position() {
        const rv = this.location || this.defaultMapLocation;
        return {
            lat: rv.latitude,
            lng: rv.longitude,
        };
    }

    search = (query: string) => {
        this.setTimeOut(async () => {
            const rv = await this.nominatim.search({ q: query, addressdetails: 1 });
            runInAction(() => {
                this.locationList = rv
                    .map(item => ({ ...item, latitude: +item.lat, longitude: +item.lon }))
                    .filter(item => !!item.address) as any;
            });
        });
    };

    reverse = (props: { lat: number; lng: number }) => {
        this.setTimeOut(async () => {
            const rv = await this.nominatim.reverse({ lat: props.lat, lon: props.lng });
            runInAction(() => {
                const l: SearchLocation = Object.assign(rv, { latitude: props.lat, longitude: props.lng });
                this.location = l;
                this.locationList = [l];
            });
        });
    };

    @action
    handleChange = (value?: SearchLocation | null) => {
        this.location = value || undefined;
    };

    use = () => {
        const model = useMemo(() => this, []);
        useEffect(() => {
            return () => clearTimeout(model.timemOut);
        });
        return model;
    };

    private timemOut = 0;
    private setTimeOut = (cb: (...args: any[]) => any) => {
        if (this.timemOut) clearTimeout(this.timemOut);
        this.timemOut = setTimeout(cb, 400) as any;
    };
}
