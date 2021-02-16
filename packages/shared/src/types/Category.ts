export type Category = {
  id: string;
  name: string;
  imageFileName: string;
  // default category for new item
  isDefault?: boolean;
  itemUniqueCount?: number;
  itemTotalCount?: number;
  lastSortIndex?: number;
};
