import 'normalize.css/normalize.css';
import ReactDOM from 'react-dom';
import { App } from './components/App/App';
import './styles/styles.scss';

// todo does not belong here, move to DashboardPage
// firebase.auth().onAuthStateChanged(async (user) => {
//   if (user) {
//     // User is signed in
//     const credential = await firebase.auth().getRedirectResult();
//     // Using store.dispatch as useDispatch cannot be used outside of functional components
//     await store.dispatch(login({ user, isNew: credential.additionalUserInfo?.isNewUser }));
//     await store.dispatch(loadUserData(user.uid));

//     console.log(asciiLogo);
//   }

//   // Re-render on both login and logout
//   renderApp();
// });

const renderApp = () => ReactDOM.render(<App />, document.getElementById('root'));
renderApp();
