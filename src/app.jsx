import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';
import store from './store/store';
import { addItem, loadItems } from './slices/items';

// todo temp to add sample items to inventory
// store.dispatch(
//   addItem({
//     name: 'Heavy backpack',
//     category: 'Backpacks',
//     tags: ['Female', 'Grey case'],
//     weight: 1380,
//     size: 'S',
//     quantity: 1,
//   })
// );

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));
renderApp();

async function renderApp() {
  await store.dispatch(loadItems());
  ReactDOM.render(jsx, document.getElementById('app'));
}
