import { CollectionSortOption } from '../enums';
import { CollectionFilters } from '../types';

export const collectionFiltersInitialState: CollectionFilters = {
  text: '',
  sortBy: CollectionSortOption.name,
};
