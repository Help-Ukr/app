import { action, makeObservable, observable, runInAction } from 'mobx';
import nominatim from 'nominatim-client';
import { useEffect, useMemo } from 'react';

export type SearchLocation = {
    address: Exclude<nominatim.SearchResultItem['address'], undefined>;
    osm_id: number;
    display_name: string;
    lat: number;
    lng: number;
};

export class SearchLocationModel {
    readonly nominatim = nominatim.createClient({ useragent: '', referer: '' });
    readonly defaultMapLocation = {
        lat: 52.5188239,
        lng: 13.4012708,
    };
    timemOut = 0;

    @observable
    location?: SearchLocation;

    @observable
    locationList: SearchLocation[] = [];

    constructor() {
        makeObservable(this);
    }

    get position() {
        return this.location || this.defaultMapLocation;
    }

    search = (query: string) => {
        this.setTimeOut(async () => {
            const rv = await this.nominatim.search({ q: query, addressdetails: 1 });
            // console.log('search', rv);
            runInAction(() => {
                this.locationList = rv
                    .map(item => ({ ...item, lat: +item.lat, lng: +item.lon }))
                    .filter(item => !!item.address) as any;
            });
        });
    };

    reverse = async (props: { lat: number; lng: number }) => {
        this.setTimeOut(async () => {
            const rv = await this.nominatim.reverse({ lat: props.lat, lon: props.lng });
            // console.log('reverse', rv);
            runInAction(() => {
                const l = Object.assign(rv, props);
                this.location = l;
                this.locationList = [l];
            });
        });
    };

    @action
    handleChange = (value?: SearchLocation | null) => {
        this.location = value || undefined;
    };

    private setTimeOut = (cb: (...args: any[]) => any) => {
        if (this.timemOut) clearTimeout(this.timemOut);
        this.timemOut = setTimeout(cb, 400) as any;
    };

    static useModel = () => {
        const model = useMemo(() => new SearchLocationModel(), []);
        useEffect(() => {
            return () => clearTimeout(model.timemOut);
        });
        return model;
    };
}
