import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { collectionCombiner } from './collectionCombiner';

export const selectAllLabels = (state: RootState) => state.labels;
const selectFilters = (state: RootState) => state.labelsFilters;

export const selectLabelCount = createSelector([selectAllLabels], labels => labels.length);

const selectFilteredLabels = createSelector([selectAllLabels, selectFilters], collectionCombiner);

export const selectDemoLabels = createSelector([selectAllLabels], labels => {
  return labels.filter(label => label.isFromDemoData === true);
});

export default selectFilteredLabels;
