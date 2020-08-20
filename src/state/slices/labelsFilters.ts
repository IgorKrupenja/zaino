import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LabelSortOption } from '../../types/labels';

type Filters = {
  text: string;
  sortBy: LabelSortOption;
};

const initialState: Filters = {
  text: '',
  sortBy: LabelSortOption.name,
};

const labelFiltersSlice = createSlice({
  name: 'filters-labels',
  initialState,
  reducers: {
    setLabelsTextFilter(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    sortLabelsBy(state, action: PayloadAction<LabelSortOption>) {
      state.sortBy = action.payload;
    },
  },
});

export const { setLabelsTextFilter, sortLabelsBy } = labelFiltersSlice.actions;

export default labelFiltersSlice.reducer;
