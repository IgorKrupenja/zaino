// all these are used by both collections: categories and labels
export enum CollectionSortOption {
  name = 'Alphabetically',
  nameReverse = 'Reverse alphabetically',
  itemsHighest = 'Most items',
  itemsLowest = 'Least items',
  itemsUniqueHighest = 'Most unique items',
  itemsUniqueLowest = 'Least unique items',
  // see comments in labels slice for saveSortOrder
  lastSortOrder = 'Last sort order',
}

export type CollectionFilters = {
  text: string;
  sortBy: CollectionSortOption;
};

export const collectionFiltersInitialState: CollectionFilters = {
  text: '',
  sortBy: CollectionSortOption.name,
};
