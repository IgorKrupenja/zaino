import { createSelector } from '@reduxjs/toolkit';
import { LabelSortOption } from '../slices/labelsFilters';
import { RootState } from '../store';

export const selectAllLabels = (state: RootState) => state.labels;
const selectFilters = (state: RootState) => state.labelsFilters;

export const selectLabelCount = createSelector([selectAllLabels], labels => labels.length);

const selectFilteredLabels = createSelector(
  [selectAllLabels, selectFilters],
  (labels, { text, sortBy }) => {
    return labels
      .filter(label => label.name.toLowerCase().includes(text.toLowerCase()))
      .sort((a, b) => {
        switch (sortBy) {
          case LabelSortOption.name:
            return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
          case LabelSortOption.itemCount:
            return a.itemTotalCount < b.itemTotalCount ? 1 : -1;
          case LabelSortOption.lastSortOrder:
            // do not sort if lastSortIndex is not set
            if (a.lastSortIndex === undefined || b.lastSortIndex === undefined) {
              return 1;
            } else {
              return a.lastSortIndex > b.lastSortIndex ? 1 : -1;
            }
        }
      });
  }
);

export default selectFilteredLabels;
