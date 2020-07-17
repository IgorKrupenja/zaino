import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const app = <>This is a test!</>;

ReactDOM.render(app, document.getElementById('app'));

// firebase.auth().onAuthStateChanged(async user => {
//   if (user) {
//     store.dispatch(login(user.uid));
//     await store.dispatch(startSetExpenses());
//     renderApp();
//     if (history.location.pathname === '/') {
//       history.push('/dashboard');
//     }
//   } else {
//     store.dispatch(logout());
//     renderApp();
//     history.push('/');
//   }
// });
