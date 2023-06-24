import { createSelector } from '@reduxjs/toolkit';
import { Item } from '@zaino/shared';

import { ItemSortOption } from '../enums';
import { RootState } from '../types';

const getPackItems = (items: Item[]) => items.filter((item) => item.packQuantity > 0);

export const selectAllInventoryItems = (state: RootState) => state.items;

export const selectAllPackItems = (state: RootState) => getPackItems(state.items);

const selectFilters = (state: RootState) => state.itemFilters;

export const selectFilteredInventoryItems = createSelector(
  [selectAllInventoryItems, selectFilters],
  (items, { text, categoryId: category, labels, sortBy }) => {
    return items
      .filter((item) => {
        const textMatch = item.name.toLowerCase().includes(text.toLowerCase());
        const categoryMatch = category ? item.categoryId === category : true;
        const labelMatch = labels.every((label) => item.labelIds?.includes(label));

        return textMatch && categoryMatch && labelMatch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case ItemSortOption.addedLatest:
            return a.addedAt < b.addedAt ? 1 : -1;
          case ItemSortOption.addedOldest:
            return a.addedAt > b.addedAt ? 1 : -1;
          case ItemSortOption.name:
            return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
          case ItemSortOption.nameReverse:
            return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
          case ItemSortOption.weightHighest:
            if (a.weight === '') {
              // Sort empty weight items to appear below 0g items
              return 1;
            } else {
              return a.weight < b.weight ? 1 : -1;
            }
          case ItemSortOption.weightLowest:
            if (b.weight === '') {
              // Sort empty weight items to appear above 0g items
              return 1;
            } else {
              return a.weight > b.weight ? 1 : -1;
            }
          default:
            return 1;
        }
      });
  }
);

export const selectFilteredPackItems = createSelector([selectFilteredInventoryItems], (items) => {
  return getPackItems(items);
});

export const selectDemoItems = createSelector([selectAllInventoryItems], (items) => {
  return items.filter((item) => item.isFromDemoData === true);
});
