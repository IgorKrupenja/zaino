import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../slices/items';
import authReducer from '../slices/auth';

export default configureStore({
  reducer: {
    items: itemsReducer,
    auth: authReducer,
  },
});
