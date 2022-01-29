import 'normalize.css/normalize.css';
import ReactDOM from 'react-dom';
import { App } from './components/App/App';
import { firebase } from './firebase/firebase';
import { loadUserData } from './state/slices/dataLoader';
import { handleLoginRedirect } from './state/slices/user';
import store from './state/store';
import './styles/styles.scss';
import { asciiLogo } from './utils/asciiLogo';

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    // on log in
    const credential = await firebase.auth().getRedirectResult();
    // using store.dispatch as useDispatch cannot be used outside of functional components
    await store.dispatch(
      handleLoginRedirect({ user, isNew: credential.additionalUserInfo?.isNewUser })
    );
    await store.dispatch(loadUserData(user.uid));
    console.log(asciiLogo);
  }

  // re-render on both login and logout
  renderApp();
});

const renderApp = () => ReactDOM.render(<App />, document.getElementById('root'));
