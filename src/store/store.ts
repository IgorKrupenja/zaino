import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/auth';
import itemsReducer from '../slices/items';
import labelsReducer from '../slices/labels';
import itemsFiltersReducer from '../slices/filtersItems';
import labelsFiltersReducer from '../slices/filtersLabels';

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
