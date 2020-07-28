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

let hasRendered = false;
const renderApp = (): void => {
  if (!hasRendered) {
    ReactDOM.render(app, document.getElementById('app'));
    hasRendered = true;
  }
};

// ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged(
  async (user): Promise<void> => {
    if (user) {
      // using store.dispatch as useDispatch cannot be used outside of functional components
      store.dispatch(setUid(user.uid));
      // todo get rid of await and paint just the header while items are loading?
      await Promise.all([
        store.dispatch(loadLabels(user.uid)),
        store.dispatch(loadItems(user.uid)),
      ]);
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    } else {
      renderApp();
      history.push('/');
    }
  }
);
