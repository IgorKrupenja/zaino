import 'normalize.css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Categories from './constants/Categories';
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
  for (let index = 0; index < 140; index++) {
    await store.dispatch(
      addItem({
        id: uuid(),
        name: 'mass item',
        categoryName: Categories[0].name,
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
  // void generateSampleData();
};

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    // on log in
    // using store.dispatch as useDispatch cannot be used outside of functional components
    store.dispatch(setUid(user.uid));
    await store.dispatch(loadItems(user.uid));
    renderApp();
    // ;)
    console.log('               .__');
    console.log('_____________  |__| ____   ____  ');
    console.log('\\___   /\\__  \\ |  |/    \\ /  _ \\ ');
    console.log(' /    /  / __ \\|  |   |  (  <_> )');
    console.log('/_____ \\(____  /__|___|  /\\____/ ');
    console.log('      \\/     \\/        \\/       ');
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    // on log out
    renderApp();
    history.push('/');
  }
});
