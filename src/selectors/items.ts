import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

const selectAllItems = (state: RootState) => state.items;
const selectFilters = (state: RootState) => state.filters;

const selectItems = createSelector(
  [selectAllItems, selectFilters],
  (items, { text, category, labels }) => {
    return items.filter(item => {
      const textMatch = item.name.toLowerCase().includes(text.toLowerCase());
      // check if category filter is set ? if so, check if item category matches : true otherwise
      const categoryMatch = category ? item.category === category : true;
      // check that item labels contain EVERY label from labels filter
      const labelMatch = labels.every(label => item.labels?.includes(label));

      // return true only if item matches all filters
      return textMatch && categoryMatch && labelMatch;
    });
  }
);

export default selectItems;
