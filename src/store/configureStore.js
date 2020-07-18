import { createStore, combineReducers } from 'redux';
import itemsReducer from '../reducers/items';

export default () =>
  createStore(
    itemsReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
