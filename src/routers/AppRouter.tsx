import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';
import DashboardPage from '../components/DashboardPage';
import LoginPage from '../components/LoginPage';

// custom history is needed for login in app.jsx to work
// as history is accessed there not from React component
// but inside firebase.auth().onAuthStateChanged()
export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" component={LoginPage} exact />
      <PrivateRoute path="/dashboard" component={DashboardPage} />
      <PrivateRoute path="/add" component={DashboardPage} />
      <PrivateRoute path="/edit/:id" component={DashboardPage} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default AppRouter;
