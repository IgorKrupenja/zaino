import { Collection } from '@zaino/shared';
import { CollectionFilters, CollectionSortOption } from '../collectionSettings';

/**
 * Common combiner for collections (both label and categories).
 * Extracted into a separate function as sorting options are exactly the same for both collections.
 */
export const collectionCombiner = (
  collections: Collection[],
  { text, sortBy }: CollectionFilters
) => {
  return collections
    .filter(collection => collection.name.toLowerCase().includes(text.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case CollectionSortOption.name:
          return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        case CollectionSortOption.nameReverse:
          return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
        case CollectionSortOption.itemsHighest:
          return a.itemTotalCount < b.itemTotalCount ? 1 : -1;
        case CollectionSortOption.itemsLowest:
          return a.itemTotalCount > b.itemTotalCount ? 1 : -1;
        case CollectionSortOption.itemsUniqueHighest:
          return a.itemUniqueCount < b.itemUniqueCount ? 1 : -1;
        case CollectionSortOption.itemsUniqueLowest:
          return a.itemUniqueCount > b.itemUniqueCount ? 1 : -1;
        case CollectionSortOption.lastSortOrder:
          return a.lastSortIndex > b.lastSortIndex ? 1 : -1;
      }
    });
};
