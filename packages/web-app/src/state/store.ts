import { configureStore } from '@reduxjs/toolkit';
import dataLoaderReducer from './slices/dataLoader';
import itemsReducer from './slices/items';
import itemsFiltersReducer from './slices/itemsFilters';
import labelsReducer from './slices/labels';
import labelsFiltersReducer from './slices/labelsFilters';
import categoriesReducer from './slices/categories';
import userReducer from './slices/user';

const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
    labels: labelsReducer,
    categories: categoriesReducer,
    itemsFilters: itemsFiltersReducer,
    labelsFilters: labelsFiltersReducer,
    dataLoader: dataLoaderReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
