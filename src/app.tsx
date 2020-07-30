import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import AppRouter, { history } from './routers/AppRouter';
import store from './store/store';
import { loadItems } from './slices/items';
import { setUid } from './slices/auth';
import { firebase } from './firebase/firebase';
import { loadLabels } from './slices/labels';
import './styles/styles.scss';

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const renderApp = () => {
  ReactDOM.render(app, document.getElementById('app'));
};

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    // using store.dispatch as useDispatch cannot be used outside of functional components
    store.dispatch(setUid(user.uid));
    await Promise.all([store.dispatch(loadLabels(user.uid)), store.dispatch(loadItems(user.uid))]);
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    renderApp();
    history.push('/');
  }
});
