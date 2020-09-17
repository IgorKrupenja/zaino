import { createBrowserHistory } from 'history';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { DashboardPage } from '../components/Pages/DashboardPage';
import LabelsPage from '../components/Pages/LabelsPage';
import { LoginPage } from '../components/Pages/LoginPage/';
import { RootState } from '../state/store';

// custom history is needed for login in app.tsx to work
// as history is accessed there not from React component
// but inside firebase.auth().onAuthStateChanged
export const history = createBrowserHistory();

const AppRouter = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.user.uid);

  return (
    <Router history={history}>
      {/* Show main app routes only if user is authenticated */}
      {isAuthenticated ? (
        <>
          <Header />
          <Switch>
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/labels" component={LabelsPage} />
            <Redirect to="/dashboard" />
          </Switch>
        </>
      ) : (
        <Switch>
          <Route path="/" component={LoginPage} exact />
          <Redirect to="/" />
        </Switch>
      )}
    </Router>
  );
};

export default AppRouter;
