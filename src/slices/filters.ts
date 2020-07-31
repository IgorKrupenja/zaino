import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filters, Category } from '../types/types';

const initialState: Filters = {
  text: '',
  // todo hz how to handle in UI
  category: undefined,
  labels: [],
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
  },
});

export const { setTextFilter, setCategoryFilter, setLabelsFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
