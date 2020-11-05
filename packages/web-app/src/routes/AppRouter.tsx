import { createBrowserHistory } from 'history';
import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { Loader } from '../components/Misc/Loader';
import { DashboardPage } from '../components/Pages/DashboardPage';
import { LabelsPage } from '../components/Pages/LabelsPage';
import { LoginPage } from '../components/Pages/LoginPage';
import { RootState } from '../state/store';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

// custom history is needed for login in app.tsx to work
// as history is accessed there not from React component
// but inside firebase.auth().onAuthStateChanged
export const sessionHistory = createBrowserHistory();

const AppRouter = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.user.uid);

  // only import policy if enabled in .env
  let PrivacyPolicy;
  if (process.env.PRIVACY_POLICY_ENABLED === 'true') {
    PrivacyPolicy = lazy(() => import('../components/Pages/PrivacyPolicy'));
  }

  return (
    <Router history={sessionHistory}>
      <Switch>
        {/* privacy policy route is accessible both if user is logged in and if they are not */}
        {/* only render policy routes if imported above */}
        {PrivacyPolicy && (
          <Route path="/privacy">
            <Suspense fallback={<Loader />}>
              <PrivacyPolicy />
            </Suspense>
          </Route>
        )}
        {/* private routes only accessible if user is logged in */}
        <PrivateRoute path="/dashboard">
          <DashboardPage />
        </PrivateRoute>
        <PrivateRoute path="/labels">
          <LabelsPage />
        </PrivateRoute>
        {/* exact ensures that invalid route is not shown in address bar on redirect */}
        <PublicRoute path="/" exact>
          <LoginPage />
        </PublicRoute>
        {isAuthenticated ? <Redirect to="/dashboard" /> : <Redirect to="/" />}
      </Switch>
    </Router>
  );
};

export default AppRouter;
