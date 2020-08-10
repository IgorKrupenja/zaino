import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LabelSortOption } from '../types/types';

type Filters = {
  text: string;
  sortBy: LabelSortOption;
};

const initialState: Filters = {
  text: '',
  sortBy: LabelSortOption.itemCount,
};

const labelFiltersSlice = createSlice({
  name: 'filters-labels',
  initialState,
  reducers: {
    setTextFilter(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    sortBy(state, action: PayloadAction<LabelSortOption>) {
      state.sortBy = action.payload;
    },
  },
});

export const { setTextFilter, sortBy } = labelFiltersSlice.actions;

export default labelFiltersSlice.reducer;
