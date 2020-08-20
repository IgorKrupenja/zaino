import { createSelector } from '@reduxjs/toolkit';
import { LabelSortOption } from '../../types/labels';
import { RootState } from '../store';

const selectLabels = (state: RootState) => state.labels;
const selectFilters = (state: RootState) => state.labelsFilters;

const selectFilteredLabels = createSelector(
  [selectLabels, selectFilters],
  (labels, { text, sortBy }) => {
    return labels
      .filter(label => label.name.toLowerCase().includes(text.toLowerCase()))
      .sort((a, b) => {
        switch (sortBy) {
          case LabelSortOption.name:
            return a.name > b.name ? 1 : -1;
          case LabelSortOption.itemCount:
            return a.itemCount < b.itemCount ? 1 : -1;
        }
      });
  }
);

export default selectFilteredLabels;
