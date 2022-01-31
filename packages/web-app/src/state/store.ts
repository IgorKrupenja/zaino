import { configureStore } from '@reduxjs/toolkit';
import categoriesFiltersReducer from './slices/categoriesFilters';
import { categoriesReducer } from './slices/categoriesSlice';
import dataLoaderReducer from './slices/dataLoader';
import itemsFiltersReducer from './slices/itemsFilters';
import { itemsReducer } from './slices/itemsSlice';
import labelsFiltersReducer from './slices/labelsFilters';
import { labelsReducer } from './slices/labelsSlice';
import userReducer from './slices/user';

const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
    labels: labelsReducer,
    categories: categoriesReducer,
    itemsFilters: itemsFiltersReducer,
    labelsFilters: labelsFiltersReducer,
    categoriesFilters: categoriesFiltersReducer,
    dataLoader: dataLoaderReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
