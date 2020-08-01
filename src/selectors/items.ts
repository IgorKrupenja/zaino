import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { SortOption } from '../types/types';

const selectAllItems = (state: RootState) => state.items;
const selectFilters = (state: RootState) => state.filters;

const selectItems = createSelector(
  [selectAllItems, selectFilters],
  (items, { text, category, labels, sortBy }) => {
    // filter out items not matching set filters
    return items
      .filter(item => {
        const textMatch = item.name.toLowerCase().includes(text.toLowerCase());
        // check if category filter is set ? if so, check if item category matches : true otherwise
        const categoryMatch = category ? item.category === category : true;
        // check that item labels contain EVERY label from labels filter
        const labelMatch = labels.every(label => item.labels?.includes(label));

        // return true only if item matches all filters
        return textMatch && categoryMatch && labelMatch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case SortOption.added:
            return a.addedAt > b.addedAt ? 1 : -1;
          case SortOption.name:
            return a.name > b.name ? 1 : -1;
          case SortOption.weight:
            return a.weight < b.weight ? 1 : -1;
        }
      });
  }
);

// use selectItems with filters already applied to compose
export const selectPackItems = createSelector([selectItems], items => {
  // filter out items not in Pack
  return items.filter(item => item.packQuantity > 0);
});

export default selectItems;
