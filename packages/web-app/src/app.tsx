import 'normalize.css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Media from 'react-media';
import { batch, Provider } from 'react-redux';
import { MobilePlaceholder } from './components/Pages/MobilePlaceholder';
import db, { firebase } from './firebase/firebase';
import AppRouter from './routes/AppRouter';
import { loadUserData } from './state/slices/dataLoader';
import { handleLoginRedirect } from './state/slices/user';
import store from './state/store';
import './styles/styles.scss';
import { getAsciiLogo } from './utils/getAsciiLogo';

const app = (
  <Provider store={store}>
    {/* Show temporary placeholder on mobiles */}
    <Media queries={{ small: { maxWidth: 599 } }}>
      {matches => (matches.small ? <MobilePlaceholder /> : <AppRouter />)}
    </Media>
  </Provider>
);

const renderApp = () => {
  ReactDOM.render(app, document.getElementById('app'));
};

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    // on log in, get resulting credential to check if new user
    const credential = await firebase.auth().getRedirectResult();
    // using store.dispatch as useDispatch cannot be used outside of functional components
    await store.dispatch(
      handleLoginRedirect({ user, isNew: credential.additionalUserInfo?.isNewUser })
    );
    // await to properly load all data + correct loader display
    await store.dispatch(loadUserData(user.uid));

    renderApp();
    console.log(getAsciiLogo());
  } else {
    // on log out
    renderApp();
  }
});
