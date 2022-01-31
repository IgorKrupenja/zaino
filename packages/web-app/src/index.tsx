import 'normalize.css/normalize.css';
import ReactDOM from 'react-dom';
import { App } from './components/App/App';
import { firebase } from './firebase/firebase';
import { loadUserData } from './state/slices/dataLoader';
import { login } from './state/slices/userSlice';
import { store } from './state/store';
import './styles/styles.scss';
import { asciiLogo } from './utils';

// todo does not belong here, move to DashboardPage
firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    // User is signed in
    const credential = await firebase.auth().getRedirectResult();
    // Using store.dispatch as useDispatch cannot be used outside of functional components
    await Promise.all([
      store.dispatch(login({ user, isNew: credential.additionalUserInfo?.isNewUser })),
      store.dispatch(loadUserData(user.uid)),
    ]);

    console.log(asciiLogo);
  }

  // Re-render on both login and logout
  renderApp();
});

const renderApp = () => ReactDOM.render(<App />, document.getElementById('root'));
