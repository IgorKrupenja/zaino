import { createBrowserHistory } from 'history';
import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Loader } from '../components/Common/Misc/Loader';
import { DashboardPage } from '../components/Dashboard/DashboardPage';
import { LabelsPage } from '../components/Labels/LabelsPage';
import { LoginPage } from '../components/Pages/LoginPage';
import { RootState } from '../state/store';
import { PrivateRoute } from './PrivateRoute';

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
        {PrivacyPolicy && (
          <Route
            path="/privacy"
            element={
              <Suspense fallback={<Loader />}>
                <PrivacyPolicy />
              </Suspense>
            }
          ></Route>
        )}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/labels"
          element={
            <PrivateRoute>
              <LabelsPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
        ></Route>
        {/* <PublicRoute path="/" exact>
          <LoginPage />
        </PublicRoute> */}
        <Route
          path="*"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
