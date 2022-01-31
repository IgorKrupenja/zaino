import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collectionFiltersInitialState } from '../constants';
import { CollectionSortOption } from '../enums';

const categoryFiltersSlice = createSlice({
  name: 'category-filters',
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

export const { setCategoryTextFilter, sortCategoriesBy, resetCategoryFilters } =
  categoryFiltersSlice.actions;
export const categoryFiltersReducer = categoryFiltersSlice.reducer;
