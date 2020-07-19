import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../slices/items';

export default configureStore({
  reducer: {
    items: itemsReducer,
  },
});
