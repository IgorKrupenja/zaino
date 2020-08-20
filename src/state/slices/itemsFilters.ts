import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, ItemSortOption } from '../../types/items';

type Filters = {
  text: string;
  category?: Category;
  labels: string[];
  sortBy: ItemSortOption;
};

const initialState: Filters = {
  text: '',
  category: undefined,
  labels: [],
  sortBy: ItemSortOption.added,
};

const itemFiltersSlice = createSlice({
  name: 'filters-items',
  initialState,
  reducers: {
    setTextFilter(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    setCategoryFilter(state, action: PayloadAction<Category | undefined>) {
      state.category = action.payload;
    },
    setLabelsFilter(state, action: PayloadAction<string[]>) {
      state.labels = action.payload;
    },
    sortBy(state, action: PayloadAction<ItemSortOption>) {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setTextFilter,
  setCategoryFilter,
  setLabelsFilter,
  sortBy,
} = itemFiltersSlice.actions;

export default itemFiltersSlice.reducer;
