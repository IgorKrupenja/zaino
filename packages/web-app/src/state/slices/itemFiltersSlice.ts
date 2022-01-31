import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemSortOption } from '../enums';

type ItemFilters = {
  text: string;
  categoryId?: string;
  labels: string[];
  sortBy: ItemSortOption;
};

export const itemFiltersInitialState: ItemFilters = {
  text: '',
  categoryId: undefined,
  labels: [],
  sortBy: ItemSortOption.addedLatest,
};

const itemFiltersSlice = createSlice({
  name: 'item-filters',
  initialState: itemFiltersInitialState,
  reducers: {
    setItemTextFilter(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    setItemCategoryFilter(state, action: PayloadAction<string | undefined>) {
      state.categoryId = action.payload;
    },
    setItemLabelsFilter(state, action: PayloadAction<string[]>) {
      state.labels = action.payload;
    },
    sortItemsBy(state, action: PayloadAction<ItemSortOption>) {
      state.sortBy = action.payload;
    },
    resetItemFilters: () => itemFiltersInitialState,
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
