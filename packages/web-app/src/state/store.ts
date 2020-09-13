import { configureStore } from '@reduxjs/toolkit';
import dataLoaderReducer from './slices/dataLoader';
import itemsReducer from './slices/items';
import itemsFiltersReducer from './slices/itemsFilters';
import labelsReducer from './slices/labels';
import labelsFiltersReducer from './slices/labelsFilters';
import userReducer from './slices/user';

const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
    labels: labelsReducer,
    itemsFilters: itemsFiltersReducer,
    labelsFilters: labelsFiltersReducer,
    dataLoader: dataLoaderReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
