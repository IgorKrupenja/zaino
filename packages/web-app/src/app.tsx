import 'normalize.css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Media from 'react-media';
import { Provider } from 'react-redux';
import { MobilePlaceholder } from './components/Pages/MobilePlaceholder';
import { firebase } from './firebase/firebase';
import AppRouter, { history } from './routes/AppRouter';
import { loadUserData } from './state/slices/dataLoader';
import { setUserDetails } from './state/slices/user';
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
    // on log in
    // using store.dispatch as useDispatch cannot be used outside of functional components
    store.dispatch(
      setUserDetails({
        uid: user.uid,
        // types for these are string | null but null seems to apply to anonymous sign in only
        // as app does not support anonymous sign anyway, casting as strings
        name: user.displayName as string,
        email: user.email as string,
        // if user has not set an photo in Google account,
        // Google conveniently provides an image with name's first letter
        photoUrl: user.photoURL as string,
      })
    );
    await store.dispatch(loadUserData(user.uid));
    renderApp();
    console.log(getAsciiLogo());
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
