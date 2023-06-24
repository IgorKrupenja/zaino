import { createSelector } from '@reduxjs/toolkit';

import { collectionCombiner } from '../combiners';
import { RootState } from '../types';

const selectFilters = (state: RootState) => state.labelFilters;

export const selectAllLabels = (state: RootState) => state.labels;

export const selectLabelCount = createSelector([selectAllLabels], (labels) => labels.length);

export const selectFilteredLabels = createSelector(
  [selectAllLabels, selectFilters],
  collectionCombiner
);

export const selectDemoDataLabels = createSelector([selectAllLabels], (labels) => {
  return labels.filter((label) => label.isFromDemoData === true);
});
