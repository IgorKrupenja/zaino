import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import 'normalize.css/normalize.css';

import './styles/styles.scss';
import AppRouter from './routers/AppRouter';
import store from './store/store';
import { addItem, itemsSlice } from './slices/items';
// import { addItem } from './actions/items';

// todo temp to add sample items to inventory
store.dispatch(
  addItem({
    name: 'Heavy backpack',
    category: 'Backpacks',
    tags: ['Female', 'Grey case'],
    weight: 1380,
    size: 'S',
    quantity: 1,
  })
);

// store.dispatch(
//   itemsSlice.actions.addItem({
//     name: 'Heavy backpack',
//     category: 'Backpacks',
//     tags: ['Female', 'Grey case'],
//     weight: 1380,
//     size: 'S',
//     quantity: 1,
//   })
// );

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('app')
);
