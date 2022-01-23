import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Loader } from '../components/Common/Misc/Loader';
import { DashboardPage } from '../components/Dashboard/DashboardPage';
import { LabelsPage } from '../components/Labels/LabelsPage';
import { LoginPage } from '../components/pages/LoginPage';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

const AppRouter = () => {
  const PrivacyPolicy = lazy(() => import('../components/pages/PrivacyPolicy'));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/privacy"
          element={
            <Suspense fallback={<Loader />}>
              <PrivacyPolicy />
            </Suspense>
          }
        ></Route>
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
