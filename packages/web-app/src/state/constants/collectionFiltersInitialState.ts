import { CollectionSortOption } from '../enums';
import { CollectionFilters } from '../types';

export const collectionFiltersInitialState: CollectionFilters = {
  sortBy: CollectionSortOption.name,
  text: '',
};
