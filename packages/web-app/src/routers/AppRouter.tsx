import { createBrowserHistory } from 'history';
import React from 'react';
import Media from 'react-media';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import CategoryImage from '../components/common/CategoryImage';
import DashboardPage from '../components/pages/DashboardPage';
import LabelsPage from '../components/pages/LabelsPage';
import LoginPage from '../components/pages/LoginPage';
import PrivateRoute from './PrivateRoute';

// custom history is needed for login in app.tsx to work
// as history is accessed there not from React component
// but inside firebase.auth().onAuthStateChanged()
export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    {/* todo temporary mobile placeholder until #174 is implemented */}
    <Media queries={{ small: { maxWidth: 599 } }}>
      {matches =>
        matches.small ? (
          <main>
            <CategoryImage categoryName="Miscellaneous" />
            <h1>No mobile version yet :(</h1>
            <p>
              Thank you for your interest in accessing Zaino on mobile! Unfortunately, the mobile
              version of the app is still a work in progress. Check{' '}
              <a href="https://github.com/krupenja/zaino/issues/174">this Github issue</a> for
              updates.
            </p>
          </main>
        ) : (
          <Switch>
            <Route path="/" component={LoginPage} exact />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <PrivateRoute path="/labels" component={LabelsPage} />
            <Redirect to="/" />
          </Switch>
        )
      }
    </Media>
  </Router>
);

export default AppRouter;
