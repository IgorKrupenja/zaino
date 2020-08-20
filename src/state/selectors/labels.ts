import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { selectAllInventoryItems } from './items';

const selectLabels = (state: RootState) => state.labels;
const selectFilters = (state: RootState) => state.labelsFilters;

const selectFilteredLabels = createSelector(
  [selectLabels, selectAllInventoryItems, selectFilters],
  (labels, items, { text, sortBy }) => {
    return labels.filter(label => label.name.toLowerCase().includes(text.toLowerCase()));
    // todo not ready
    // .sort((a, b) => {
    //   const itemCountA = '';
    //   switch (sortBy) {
    //     case LabelSortOption.name:
    //       return a.name > b.name ? 1 : -1;
    //     case LabelSortOption.itemCount:
    //       return a.weight < b.weight ? 1 : -1;
    //   }
    // });
  }
);
