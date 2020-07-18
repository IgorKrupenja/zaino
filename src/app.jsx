import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';

import './styles/styles.scss';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { addItem } from './actions/items';

// todo temp to add sample items to inventory
const store = configureStore();
store.dispatch(
  addItem({
    name: 'Heavy backpack',
    category: 'Backpacks',
    tags: ['Female', 'Grey case'],
    weight: 1380,
    quantity: 1,
  })
);

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
