import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { collectionFiltersInitialState } from '../constants';
import { CollectionSortOption } from '../enums';

const labelFiltersSlice = createSlice({
  initialState: collectionFiltersInitialState,
  name: 'label-filters',
  reducers: {
    resetLabelFilters: () => collectionFiltersInitialState,
    setLabelTextFilter(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    sortLabelsBy(state, action: PayloadAction<CollectionSortOption>) {
      state.sortBy = action.payload;
    },
  },
});

export const { setLabelTextFilter, sortLabelsBy, resetLabelFilters } = labelFiltersSlice.actions;
export const labelFiltersReducer = labelFiltersSlice.reducer;
