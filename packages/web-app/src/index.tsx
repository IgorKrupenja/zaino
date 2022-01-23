import 'normalize.css/normalize.css';
import ReactDOM from 'react-dom';
import { App } from './components/App/App';
import { firebase } from './firebase/firebase';
import reportWebVitals from './reportWebVitals';
import { loadUserData } from './state/slices/dataLoader';
import { handleLoginRedirect } from './state/slices/user';
import store from './state/store';
import './styles/styles.scss';
import { getAsciiLogo } from './utils/getAsciiLogo';

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

const renderApp = () => ReactDOM.render(<App />, document.getElementById('root'));

// From CRA: If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
