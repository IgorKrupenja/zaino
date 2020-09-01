import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import itemsReducer from './slices/items';
import itemsFiltersReducer from './slices/itemsFilters';
import labelsReducer from './slices/labels';
import labelsFiltersReducer from './slices/labelsFilters';

const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    labels: labelsReducer,
    itemsFilters: itemsFiltersReducer,
    labelsFilters: labelsFiltersReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
