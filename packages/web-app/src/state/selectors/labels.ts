import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { collectionCombiner } from './collectionCombiner';

const selectFilters = (state: RootState) => state.labelFilters;

export const selectAllLabels = (state: RootState) => state.labels;

export const selectLabelCount = createSelector([selectAllLabels], (labels) => labels.length);

// TODO: export named
const selectFilteredLabels = createSelector([selectAllLabels, selectFilters], collectionCombiner);

export const selectDemoDataLabels = createSelector([selectAllLabels], (labels) => {
  return labels.filter((label) => label.isFromDemoData === true);
});

export default selectFilteredLabels;
