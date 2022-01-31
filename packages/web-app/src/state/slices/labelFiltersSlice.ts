import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collectionFiltersInitialState } from '../constants';
import { CollectionSortOption } from '../enums';

const labelFiltersSlice = createSlice({
  name: 'label-filters',
  initialState: collectionFiltersInitialState,
  reducers: {
    setLabelTextFilter(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    sortLabelsBy(state, action: PayloadAction<CollectionSortOption>) {
      state.sortBy = action.payload;
    },
    resetLabelFilters: () => collectionFiltersInitialState,
  },
});

export const { setLabelTextFilter, sortLabelsBy, resetLabelFilters } = labelFiltersSlice.actions;
export const labelFiltersReducer = labelFiltersSlice.reducer;
