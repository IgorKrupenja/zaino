import 'normalize.css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { firebase } from './firebase/firebase';
import AppRouter, { history } from './routers/AppRouter';
import { setUid } from './state/slices/auth';
import { addItem, loadItems } from './state/slices/items';
import store from './state/store';
import './styles/styles.scss';
import { Category } from './types/items';

// import all images beforehand so that dynamic references can be used in img src values
const importAll = (context: __WebpackModuleApi.RequireContext) => context.keys().map(context);
importAll(require.context('./images', true, /\.(png|jpe?g|svg)$/));

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const generateSampleData = async () => {
  for (let index = 0; index < 125; index++) {
    await store.dispatch(
      addItem({
        id: uuid(),
        name: 'mass item',
        category: Category.backpacks,
        weight: 100,
        quantity: 1,
        packQuantity: 0,
        addedAt: new Date().toISOString(),
      })
    );
  }
};

const renderApp = () => {
  ReactDOM.render(app, document.getElementById('app'));
  // generateSampleData();
};

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    // using store.dispatch as useDispatch cannot be used outside of functional components
    store.dispatch(setUid(user.uid));
    await store.dispatch(loadItems(user.uid));
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    renderApp();
    history.push('/');
  }
});
