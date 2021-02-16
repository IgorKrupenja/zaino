import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collectionFiltersInitialState, CollectionSortOption } from '../collectionSettings';

const labelFiltersSlice = createSlice({
  name: 'filters-labels',
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

export default labelFiltersSlice.reducer;
