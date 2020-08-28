import { createSelector } from '@reduxjs/toolkit';
import { Item } from '../../types/Item';
import { ItemSortOption } from '../slices/itemsFilters';
import { RootState } from '../store';

const filterPackItems = (items: Item[]) => items.filter(item => item.packQuantity > 0);

export const selectAllInventoryItems = (state: RootState) => state.items;
export const selectAllPackItems = (state: RootState) => filterPackItems(state.items);
const selectFilters = (state: RootState) => state.itemsFilters;

const selectFilteredInventoryItems = createSelector(
  [selectAllInventoryItems, selectFilters],
  (items, { text, category, labels, sortBy }) => {
    // filter out items not matching set filters
    return items
      .filter(item => {
        const textMatch = item.name.toLowerCase().includes(text.toLowerCase());
        // check if category filter is set ? if so, check if item category matches : true otherwise
        const categoryMatch = category ? item.categoryName === category : true;
        // check that item labels contain EVERY label from labels filter
        const labelMatch = labels.every(label => item.labelIds?.includes(label));

        // return true only if item matches all filters
        return textMatch && categoryMatch && labelMatch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case ItemSortOption.added:
            return a.addedAt > b.addedAt ? 1 : -1;
          case ItemSortOption.name:
            return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
          case ItemSortOption.weight:
            // do not sort if weight is not set
            if (a.weight === undefined || b.weight === undefined) {
              return 1;
            } else {
              return a.weight > b.weight ? 1 : -1;
            }
        }
      });
  }
);

// use selectItems with filters already applied to compose
export const selectFilteredPackItems = createSelector([selectFilteredInventoryItems], items => {
  // filter out items not in Pack
  return filterPackItems(items);
});

export default selectFilteredInventoryItems;
