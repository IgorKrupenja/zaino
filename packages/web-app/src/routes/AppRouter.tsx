import { createBrowserHistory } from 'history';
import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import { Loader } from '../components/Common/Misc/Loader';
import { DashboardPage } from '../components/Dashboard/DashboardPage';
import { LabelsPage } from '../components/Labels/LabelsPage';
import { LoginPage } from '../components/Pages/LoginPage';
import { RootState } from '../state/store';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

// custom history is needed for login in app.tsx to work
// as history is accessed there not from React component
// but inside firebase.auth().onAuthStateChanged
// todo test
export const sessionHistory = createBrowserHistory();

const AppRouter = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.user.uid);

  let PrivacyPolicy;
  if (process.env.PRIVACY_POLICY_ENABLED === 'true') {
    PrivacyPolicy = lazy(() => import('../components/Pages/PrivacyPolicy'));
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* privacy policy route is accessible both if user is logged in and if they are not */}
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
        {isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
