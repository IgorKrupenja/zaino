import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { collectionCombiner } from './collectionCombiner';

export const selectAllCategories = (state: RootState) => state.categories;
const selectFilters = (state: RootState) => state.categoriesFilters;

export const selectCategoryCount = createSelector(
  [selectAllCategories],
  categories => categories.length
);

const selectFilteredCategories = createSelector(
  [selectAllCategories, selectFilters],
  collectionCombiner
);

export default selectFilteredCategories;
