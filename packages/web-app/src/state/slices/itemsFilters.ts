import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ItemFilters = {
  text: string;
  category?: string;
  labels: string[];
  sortBy: ItemSortOption;
};

export enum ItemSortOption {
  added = 'Recently added',
  name = 'Name',
  weight = 'Weight',
}

export const itemFiltersInitialState: ItemFilters = {
  text: '',
  category: undefined,
  labels: [],
  sortBy: ItemSortOption.added,
};

const itemFiltersSlice = createSlice({
  name: 'filters-items',
  initialState: itemFiltersInitialState,
  reducers: {
    setItemTextFilter(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    setItemCategoryFilter(state, action: PayloadAction<string | undefined>) {
      state.category = action.payload;
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

export default itemFiltersSlice.reducer;
