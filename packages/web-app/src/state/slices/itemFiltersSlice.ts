import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemSortOption } from '../enums';

type ItemFilters = {
  text: string;
  categoryId?: string;
  labels: string[];
  sortBy: ItemSortOption;
};

export const itemFiltersInitialState: ItemFilters = {
  categoryId: undefined,
  labels: [],
  sortBy: ItemSortOption.addedLatest,
  text: '',
};

const itemFiltersSlice = createSlice({
  initialState: itemFiltersInitialState,
  name: 'item-filters',
  reducers: {
    resetItemFilters: () => itemFiltersInitialState,
    setItemCategoryFilter(state, action: PayloadAction<string | undefined>) {
      state.categoryId = action.payload;
    },
    setItemLabelsFilter(state, action: PayloadAction<string[]>) {
      state.labels = action.payload;
    },
    setItemTextFilter(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    sortItemsBy(state, action: PayloadAction<ItemSortOption>) {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setItemTextFilter,
  setItemCategoryFilter,
  setItemLabelsFilter,
  sortItemsBy,
  resetItemFilters,
} = itemFiltersSlice.actions;
export const itemFiltersReducer = itemFiltersSlice.reducer;
