export interface ItemCategory {
  id: string;
  icon: string;
  displayName: string;
}

export interface AvailableItem {
  itemCategoryId: string;
  quantity: number;
}
