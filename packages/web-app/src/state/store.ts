import { configureStore } from '@reduxjs/toolkit';

import { categoriesReducer } from './slices/categoriesSlice';
import { categoryFiltersReducer } from './slices/categoryFiltersSlice';
import { demoDataReducer } from './slices/demoDataSlice';
import { itemFiltersReducer } from './slices/itemFiltersSlice';
import { itemsReducer } from './slices/itemsSlice';
import { labelFiltersReducer } from './slices/labelFiltersSlice';
import { labelsReducer } from './slices/labelsSlice';
import { userReducer } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    categoryFilters: categoryFiltersReducer,
    demoData: demoDataReducer,
    itemFilters: itemFiltersReducer,
    items: itemsReducer,
    labelFilters: labelFiltersReducer,
    labels: labelsReducer,
    user: userReducer,
  },
});
