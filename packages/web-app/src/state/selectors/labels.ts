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
          case LabelSortOption.nameReverse:
            return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
          case LabelSortOption.itemsHighest:
            if (a.itemTotalCount === undefined || b.itemTotalCount === undefined) {
              // sort labels with no items below all other
              return 0;
            } else {
              return a.itemTotalCount < b.itemTotalCount ? 1 : -1;
            }
          case LabelSortOption.itemsLowest:
            if (a.itemTotalCount === undefined || b.itemTotalCount === undefined) {
              // sort labels with no items above all other
              return 0;
            } else {
              return a.itemTotalCount > b.itemTotalCount ? 1 : -1;
            }
          case LabelSortOption.itemsUniqueHighest:
            if (a.itemUniqueCount === undefined || b.itemUniqueCount === undefined) {
              // sort labels with no items below all other
              return 0;
            } else {
              return a.itemUniqueCount < b.itemUniqueCount ? 1 : -1;
            }
          case LabelSortOption.itemsUniqueLowest:
            if (a.itemUniqueCount === undefined || b.itemUniqueCount === undefined) {
              // sort labels with no items above all other
              return 0;
            } else {
              return a.itemUniqueCount > b.itemUniqueCount ? 1 : -1;
            }
          case LabelSortOption.lastSortOrder:
            if (a.lastSortIndex === undefined || b.lastSortIndex === undefined) {
              return 0;
            } else {
              return a.lastSortIndex > b.lastSortIndex ? 1 : -1;
            }
        }
      });
  }
);

export const selectDemoLabels = createSelector([selectAllLabels], labels => {
  return labels.filter(label => label.isFromDemoData === true);
});

export default selectFilteredLabels;
