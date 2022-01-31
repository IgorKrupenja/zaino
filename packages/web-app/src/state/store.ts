import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from './slices/categoriesSlice';
import { categoryFiltersReducer } from './slices/categoryFiltersSlice';
import { demoDataReducer } from './slices/dataLoader';
import { itemFiltersReducer } from './slices/itemFiltersSlice';
import { itemsReducer } from './slices/itemsSlice';
import { labelFiltersReducer } from './slices/labelFiltersSlice';
import { labelsReducer } from './slices/labelsSlice';
import { userReducer } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
    labels: labelsReducer,
    categories: categoriesReducer,
    itemFilters: itemFiltersReducer,
    labelFilters: labelFiltersReducer,
    categoryFilters: categoryFiltersReducer,
    demoData: demoDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
