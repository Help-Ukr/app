export interface ItemCategory {
    id: number;
    icon: string;
    name: string;
    parent?: number;
}

export interface CollectionPointItem {
    itemCategoryId: string;
    quantity?: number;
}

export interface CollectionPoint {
    displayName: string;
    location: {
        lat: number;
        lng: number;
        address: string;
    };
    neededItems: CollectionPointItem[];
    phoneNr?: string;
    telegramHandle?: string;
    coverImg?: string;
    // TODO: Opening hours
    // openings?: string[];
}
