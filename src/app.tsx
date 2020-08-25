import 'normalize.css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { CategoryName } from './constants/categories';
import { firebase } from './firebase/firebase';
import AppRouter, { history } from './routers/AppRouter';
import { setUid } from './state/slices/auth';
import { addItem, loadItems } from './state/slices/items';
import store from './state/store';
import './styles/styles.scss';

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// todo remove after doing demo data
const generateSampleData = async () => {
  for (let index = 0; index < 125; index++) {
    await store.dispatch(
      addItem({
        id: uuid(),
        name: 'mass item',
        categoryName: CategoryName.backpacks,
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
