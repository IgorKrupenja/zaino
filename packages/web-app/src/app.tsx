import 'normalize.css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { firebase } from './firebase/firebase';
import AppRouter, { history } from './routers/AppRouter';
import { setUid } from './state/slices/auth';
import { loadUserData } from './state/slices/dataLoader';
import store from './state/store';
import './styles/styles.scss';

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const showConsoleLogo = () => {
  // ;)
  console.log('               .__               ');
  console.log('_____________  |__| ____   ____  ');
  console.log('\\___   /\\__  \\ |  |/    \\ /  _ \\ ');
  console.log(' /    /  / __ \\|  |   |  (  <_> )');
  console.log('/_____ \\(____  /__|___|  /\\____/ ');
  console.log('      \\/     \\/        \\/        ');
};

const renderApp = () => {
  ReactDOM.render(app, document.getElementById('app'));
};

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    // on log in
    // using store.dispatch as useDispatch cannot be used outside of functional components
    store.dispatch(setUid(user.uid));
    await store.dispatch(loadUserData(user.uid));
    renderApp();
    showConsoleLogo();
    // only redirect to dashboard from root, not e.g from /labels
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    // on log out
    renderApp();
    history.push('/');
  }
});
