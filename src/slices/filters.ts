import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, SortOption } from '../types/types';

type Filters = {
  text: string;
  category?: Category;
  labels: string[];
  sortBy: SortOption;
};

const initialState: Filters = {
  text: '',
  category: undefined,
  labels: [],
  sortBy: SortOption.added,
};

const filtersSlice = createSlice({
  name: 'filters',
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
    sortBy(state, action: PayloadAction<SortOption>) {
      state.sortBy = action.payload;
    },
  },
});

export const { setTextFilter, setCategoryFilter, setLabelsFilter, sortBy } = filtersSlice.actions;

export default filtersSlice.reducer;
