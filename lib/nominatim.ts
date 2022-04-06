import * as queryString from 'query-string';

export class Nominatim {
    search(params: Nominatim.SearchOptions) {
        const queryParams = { ...this.defaultParams, ...params };
        const search = queryString.stringify(queryParams);

        return this.fetchData<Nominatim.SearchResultItem[]>(`${this.API_ENDPOINT}/?${search}`);
    }
    reverse(params: Nominatim.ReverseOptions) {
        const queryParams = { ...this.defaultParams, zoom: 18, ...params };
        const search = queryString.stringify(queryParams);

        return this.fetchData<Nominatim.ReverseResult>(`${this.API_ENDPOINT}/reverse?${search}`);
    }

    private async fetchData<T = any>(url: string): Promise<T> {
        const rv = await fetch(url);
        const json = await rv.json();
        return json;
    }

    API_ENDPOINT = 'https://nominatim.openstreetmap.org';
    defaultParams = { format: 'json' };
}

export namespace Nominatim {
    export type SearchOptions = {
        q: string;
        addressdetails?: 1;
    };

    export type SearchResultItem = {
        place_id: number;
        licence: string;
        osm_type: string;
        osm_id: number;
        boundingbox: string[];
        lat: string;
        lon: string;
        display_name: string;
        class: string;
        type: string;
        importance: number;
        // Defined when SearchOptions.addressdetails is provided
        address?: {
            road: string;
            suburb: string;
            city_district: string;
            city: string;
            county: string;
            state: string;
            postcode: string;
            country: string;
            country_code: string;
        };
    };

    export type ReverseOptions = {
        lat: number;
        lon: number;
    };

    export type ReverseResult = {
        place_id: number;
        licence: string;
        osm_type: string;
        osm_id: number;
        lat: string;
        lon: string;
        display_name: string;
        address: {
            amenity: string;
            road: string;
            suburb: string;
            city_district: string;
            city: string;
            county: string;
            state: string;
            postcode: string;
            country: string;
            country_code: string;
        };
        boundingbox: string[];
    };
}
