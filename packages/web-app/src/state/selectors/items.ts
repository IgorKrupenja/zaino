import { createSelector } from '@reduxjs/toolkit';
import { Item } from '@zaino/shared';
import { ItemSortOption } from '../slices/itemsFilters';
import { RootState } from '../store';

const getPackItems = (items: Item[]) => items.filter((item) => item.packQuantity > 0);

export const selectAllInventoryItems = (state: RootState) => state.items;

export const selectAllPackItems = (state: RootState) => getPackItems(state.items);

const selectFilters = (state: RootState) => state.itemsFilters;

const selectFilteredInventoryItems = createSelector(
  [selectAllInventoryItems, selectFilters],
  (items, { text, categoryId: category, labels, sortBy }) => {
    // filter out items not matching set filters
    return items
      .filter((item) => {
        const textMatch = item.name.toLowerCase().includes(text.toLowerCase());
        // check if category filter is set ? if so, check if item category matches : true otherwise
        const categoryMatch = category ? item.categoryId === category : true;
        // check that item labels contain EVERY label from labels filter
        const labelMatch = labels.every((label) => item.labelIds?.includes(label));

        // return true only if item matches all filters
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
              // sort empty weight items appear below 0g items
              return 1;
            } else {
              return a.weight < b.weight ? 1 : -1;
            }
          case ItemSortOption.weightLowest:
            if (b.weight === '') {
              // sort empty weight items appear above 0g items
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

// use selectItems with filters already applied to compose
export const selectFilteredPackItems = createSelector([selectFilteredInventoryItems], (items) => {
  // filter out items not in Pack
  return getPackItems(items);
});

export const selectDemoItems = createSelector([selectAllInventoryItems], (items) => {
  return items.filter((item) => item.isFromDemoData === true);
});

export default selectFilteredInventoryItems;
