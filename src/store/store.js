import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/auth';
import itemsReducer from '../slices/items';
import labelsReducer from '../slices/labels';

export default configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    labels: labelsReducer,
  },
});
