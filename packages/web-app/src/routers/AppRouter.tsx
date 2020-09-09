import { createBrowserHistory } from 'history';
import React from 'react';
import Media from 'react-media';
import { useSelector } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import CategoryImage from '../components/misc/CategoryImage';
import DashboardPage from '../components/Pages/DashboardPage';
import LabelsPage from '../components/Pages/LabelsPage';
import LoginPage from '../components/Pages/LoginPage';
import { RootState } from '../state/store';

// custom history is needed for login in app.tsx to work
// as history is accessed there not from React component
// but inside firebase.auth().onAuthStateChanged()
export const history = createBrowserHistory();

const AppRouter = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.uid);

  return (
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
              {/* prevent showing empty Dashboard/Labels if users presses back after logout */}
              {isAuthenticated && (
                <>
                  <Route path="/dashboard" component={DashboardPage} />
                  <Route path="/labels" component={LabelsPage} />
                </>
              )}
              <Redirect to="/" />
            </Switch>
          )
        }
      </Media>
    </Router>
  );
};

export default AppRouter;
