export interface ItemCategory {
  id: string;
  icon: string;
  displayName: string;
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
  availableItems: CollectionPointItem[];
  neededItems: CollectionPointItem[];
  phoneNr?: string;
  telegramHandle?: string;
  coverImg?: string;
  // TODO: Opening hours
  // openings?: string[];
}
