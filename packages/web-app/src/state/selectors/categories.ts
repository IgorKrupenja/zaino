import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { collectionCombiner } from './collectionCombiner';

const selectAllCategories = (state: RootState) => state.categories;

const selectFilters = (state: RootState) => state.categoryFilters;

export const selectCategoryCount = createSelector(
  [selectAllCategories],
  (categories) => categories.length
);

const selectFilteredCategories = createSelector(
  [selectAllCategories, selectFilters],
  collectionCombiner
);

export default selectFilteredCategories;
