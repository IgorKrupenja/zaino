import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../types/Item';

type Filters = {
  text: string;
  category?: Category;
  labels: string[];
  sortBy: ItemSortOption;
};

// todo check what works best with react-select
export enum ItemSortOption {
  added = 'Recently added',
  name = 'Name',
  weight = 'Weight',
}

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
    setItemsTextFilter(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    setItemsCategoryFilter(state, action: PayloadAction<Category | undefined>) {
      state.category = action.payload;
    },
    setItemsLabelsFilter(state, action: PayloadAction<string[]>) {
      state.labels = action.payload;
    },
    sortItemsBy(state, action: PayloadAction<ItemSortOption>) {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setItemsTextFilter,
  setItemsCategoryFilter,
  setItemsLabelsFilter,
  sortItemsBy,
} = itemFiltersSlice.actions;

export default itemFiltersSlice.reducer;
