import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collectionFiltersInitialState, CollectionSortOption } from '../collectionSettings';

const CategoryFiltersSlice = createSlice({
  name: 'filters-categories',
  initialState: collectionFiltersInitialState,
  reducers: {
    setCategoryTextFilter(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    sortCategoriesBy(state, action: PayloadAction<CollectionSortOption>) {
      state.sortBy = action.payload;
    },
    resetCategoryFilters: () => collectionFiltersInitialState,
  },
});

export const {
  setCategoryTextFilter,
  sortCategoriesBy,
  resetCategoryFilters,
} = CategoryFiltersSlice.actions;

export default CategoryFiltersSlice.reducer;
