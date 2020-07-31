import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/auth';
import itemsReducer from '../slices/items';
import labelsReducer from '../slices/labels';
import filtersReducer from '../slices/filters';

const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    labels: labelsReducer,
    filters: filtersReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
