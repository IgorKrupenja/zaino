import { createSelector } from '@reduxjs/toolkit';
import { collectionCombiner } from '../combiners';
import { RootState } from '../store';

// TODO: currently unused, for #516
const selectAllCategories = (state: RootState) => state.categories;

const selectFilters = (state: RootState) => state.categoryFilters;

export const selectCategoryCount = createSelector(
  [selectAllCategories],
  (categories) => categories.length
);

export const selectFilteredCategories = createSelector(
  [selectAllCategories, selectFilters],
  collectionCombiner
);
