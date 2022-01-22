import { createBrowserHistory } from 'history';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Loader } from '../components/Common/Misc/Loader';
import { DashboardPage } from '../components/Dashboard/DashboardPage';
import { LabelsPage } from '../components/Labels/LabelsPage';
import { LoginPage } from '../components/Pages/LoginPage';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

// custom history is needed for login in app.tsx to work
// as history is accessed there not from React component
// but inside firebase.auth().onAuthStateChanged
// todo test
export const sessionHistory = createBrowserHistory();

const AppRouter = () => {
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
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="*"
          element={
            <PublicRoute>
              <Navigate to="/" />
            </PublicRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
