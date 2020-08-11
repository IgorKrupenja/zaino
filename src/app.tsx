import 'normalize.css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { firebase } from './firebase/firebase';
import AppRouter, { history } from './routers/AppRouter';
import { setUid } from './slices/auth';
import { loadItems, addItem } from './slices/items';
import store from './store/store';
import './styles/styles.scss';

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const renderApp = () => {
  ReactDOM.render(app, document.getElementById('app'));
  // for (let index = 0; index < 125; index++) {
  //   // const element = array[index];
  //   store.dispatch(
  //     addItem({
  //       id: uuid(),
  //       name: 'mass item',
  //       category: Category.backpacks,
  //       weight: 100,
  //       quantity: 1,
  //       packQuantity: 0,
  //       addedAt: new Date().toISOString(),
  //     })
  //   );
  // }
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
