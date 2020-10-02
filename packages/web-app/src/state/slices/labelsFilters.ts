import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LabelFilters = {
  text: string;
  sortBy: LabelSortOption;
};

export enum LabelSortOption {
  name = 'Alphabetically',
  nameReverse = 'Reverse alphabetically',
  itemsHighest = 'Most items',
  itemsLowest = 'Least items',
  // see comments in labels slice for saveSortOrder
  lastSortOrder = 'Last sort order',
}

export const labelFiltersInitialState: LabelFilters = {
  text: '',
  sortBy: LabelSortOption.name,
};

const labelFiltersSlice = createSlice({
  name: 'filters-labels',
  initialState: labelFiltersInitialState,
  reducers: {
    setLabelTextFilter(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    sortLabelsBy(state, action: PayloadAction<LabelSortOption>) {
      state.sortBy = action.payload;
    },
    resetLabelFilters: () => labelFiltersInitialState,
  },
});

export const { setLabelTextFilter, sortLabelsBy, resetLabelFilters } = labelFiltersSlice.actions;

export default labelFiltersSlice.reducer;
