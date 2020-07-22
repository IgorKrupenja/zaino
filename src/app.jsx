import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import AppRouter, { history } from './routers/AppRouter';
import store from './store/store';
import { addItem, loadItems } from './slices/items';
import { setUid } from './slices/auth';
import { firebase } from './firebase/firebase';

const testItem = {
  name: 'Heavy backpack',
  category: 'Backpacks',
  tags: ['Female', 'Grey case'],
  weight: 1380,
  size: 'S',
  quantity: 1,
};

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(app, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    store.dispatch(setUid(user.uid));
    // todo temp to add sample item to inventory
    // store.dispatch(addItem(testItem));
    await store.dispatch(loadItems());
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    renderApp();
    history.push('/');
  }
});
