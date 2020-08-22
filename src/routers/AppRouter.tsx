import { createBrowserHistory } from 'history';
import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import DashboardPage from '../components/pages/DashboardPage';
import LabelsPage from '../components/pages/LabelsPage';
import LoginPage from '../components/pages/LoginPage';

// custom history is needed for login in app.jsx to work
// as history is accessed there not from React component
// but inside firebase.auth().onAuthStateChanged()
export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" component={LoginPage} exact />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/labels" component={LabelsPage} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default AppRouter;
