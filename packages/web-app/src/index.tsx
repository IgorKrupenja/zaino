// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
import 'normalize.css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Media from 'react-media';
import { Provider } from 'react-redux';
import { MobilePlaceholder } from './components/Pages/MobilePlaceholder';
import { firebase } from './firebase/firebase';
import reportWebVitals from './reportWebVitals';
import AppRouter from './routes/AppRouter';
import { loadUserData } from './state/slices/dataLoader';
import { handleLoginRedirect } from './state/slices/user';
import store from './state/store';
import './styles/styles.scss';
import { getAsciiLogo } from './utils/getAsciiLogo';

const app = (
  <React.StrictMode>
    <Provider store={store}>
      {/* Show temporary placeholder on mobiles */}
      <Media queries={{ small: { maxWidth: 599 } }}>
        {(matches) => (matches.small ? <MobilePlaceholder /> : <AppRouter />)}
      </Media>
    </Provider>
  </React.StrictMode>
);

const renderApp = () => {
  ReactDOM.render(app, document.getElementById('root'));
};

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    // on log in
    // get resulting credential to check if new user
    const credential = await firebase.auth().getRedirectResult();
    // using store.dispatch as useDispatch cannot be used outside of functional components
    await store.dispatch(
      handleLoginRedirect({ user, isNew: credential.additionalUserInfo?.isNewUser })
    );
    await store.dispatch(loadUserData(user.uid));
    console.log(getAsciiLogo());
  }
  // re-render on both login and logout
  renderApp();
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
