import { ChangeEvent } from 'react';

export type StrKey<T> = Extract<keyof T, string>;

export type EventOrValue<V = string> = ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | V;

export type GeoPosition = { lat: number; lng: number; hdop?: number };
