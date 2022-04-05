import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collectionFiltersInitialState } from '../constants';
import { CollectionSortOption } from '../enums';

const categoryFiltersSlice = createSlice({
  initialState: collectionFiltersInitialState,
  name: 'category-filters',
  reducers: {
    resetCategoryFilters: () => collectionFiltersInitialState,
    setCategoryTextFilter(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    sortCategoriesBy(state, action: PayloadAction<CollectionSortOption>) {
      state.sortBy = action.payload;
    },
  },
});

export const { setCategoryTextFilter, sortCategoriesBy, resetCategoryFilters } =
  categoryFiltersSlice.actions;
export const categoryFiltersReducer = categoryFiltersSlice.reducer;
