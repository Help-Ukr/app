import { CollectionPoint, ItemCategory } from './types';

export const ITEM_CATEGORIES: ItemCategory[] = [
    { id: '1', icon: '🦺', displayName: 'Military Vest' },
    { id: '2', icon: '🔋', displayName: 'Powerbank' },
    { id: '3', icon: '📳', displayName: 'Phone Chargers' },
    { id: '4', icon: '✨', displayName: 'AAA Batteries' },
    { id: '5', icon: '🩲', displayName: 'Thermo Underwear' },
    { id: '6', icon: '🔦', displayName: 'Flashlight' },
];

export const COLLECTION_POINTS: CollectionPoint[] = [
    {
        displayName: 'Space Meduza',

        neededItems: [
            { itemCategoryId: '3' },
            { itemCategoryId: '6' },
            { itemCategoryId: '4' },
            { itemCategoryId: '5' },
        ],
        location: {
            lat: 59.334591,
            lng: 18.06324,
            address: 'Skalitzer Straße 80, 10990 Berlin',
        },
        phoneNr: '+491767890123',
        telegramHandle: '@space_meduza',
        coverImg:
            'https://unsplash.com/photos/pNIgH0y3upM/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ2NDY3OTkw&force=true&w=1920',
    },
    {
        displayName: 'Die Perle',
        neededItems: [
            { itemCategoryId: '3' },
            { itemCategoryId: '6' },
            { itemCategoryId: '4' },
            { itemCategoryId: '5' },
        ],
        location: {
            lat: 52.4972558,
            lng: 13.4301665,
            address: 'Reichenberger Str. 47, 10999 Berlin',
        },
        phoneNr: '+491767890123',
        telegramHandle: '@die_perle',
        coverImg: 'https://lh3.ggpht.com/p/AF1QipMXQXw-I8s_Y2oR1b9d2B-eGi0u7HkYcK4fZmv9=s1024',
    },
    {
        displayName: 'Wohnzimmerbar',
        neededItems: [
            { itemCategoryId: '1' },
            { itemCategoryId: '2' },
            { itemCategoryId: '4' },
            { itemCategoryId: '5' },
        ],
        location: {
            lat: 52.5435294,
            lng: 13.416902,
            address: 'Lettestraße 6, 10437 Berlin',
        },
        phoneNr: '+491767890123',
        telegramHandle: '@wohnzimmerbar',
        coverImg: 'https://lh3.ggpht.com/p/AF1QipOwDYTnfLd27TGBYCzqmsB297frwy0wOfgXDwUP=s512',
    },
    {
        displayName: 'Lerchen&Eulen',
        neededItems: [
            { itemCategoryId: '3' },
            { itemCategoryId: '6' },
            { itemCategoryId: '4' },
            { itemCategoryId: '5' },
        ],
        location: {
            lat: 52.5002808,
            lng: 13.4380541,
            address: 'Pücklerstraße 33, 10997 Berlin',
        },
        phoneNr: '+491767890123',
        telegramHandle: '@lerchen_eulen',
        coverImg: 'https://lh3.ggpht.com/p/AF1QipOyNGjrHs6mKvJDMFmYpI-4A2UcRW7gHfwaYlKr=s512',
    },
    {
        displayName: 'MOM’S Creation',
        neededItems: [
            { itemCategoryId: '3' },
            { itemCategoryId: '6' },
            { itemCategoryId: '4' },
            { itemCategoryId: '5' },
        ],
        location: {
            lat: 52.4972558,
            lng: 13.4301665,
            address: 'Elsenstraße 27, 12435 Berlin',
        },
        phoneNr: '+491767890123',
        telegramHandle: '@moms_creation',
        coverImg: 'https://lh5.googleusercontent.com/p/AF1QipOzrJCt7ayS8QXS8l3TFE1j_m34L1jt_Hos1PuI=s451-k-no',
    },
];
