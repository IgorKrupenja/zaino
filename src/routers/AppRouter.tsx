import { createBrowserHistory } from 'history';
import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import DashboardPage from '../components/DashboardPage';
import LabelsPage from '../components/LabelsPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';

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
      <PrivateRoute path="/labels" component={LabelsPage} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default AppRouter;
