import { Wgs84Location } from './types';

export function createReverseGeocodeUrl(location: Wgs84Location) {
    return `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lon}&format=json`;
}

export function createGeocodeUrl(searchTerm?: string) {
    return searchTerm ? `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json` : undefined;
}
