import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Loader } from '../components/common/misc/Loader';
import { DashboardPage } from '../components/dashboard/DashboardPage';
import { LabelsPage } from '../components/labels/LabelsPage';
import { CategoriesPage } from '../components/other/CategoriesPage';
import { LoginPage } from '../components/other/LoginPage';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const PrivacyPolicy = lazy(() => import('../components/other/PrivacyPolicyPage'));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <PrivacyPolicy />
            </Suspense>
          }
          path="/privacy"
        ></Route>
        <Route
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
          path="/dashboard/*"
        ></Route>
        {process.env.REACT_APP_SHOW_CATEGORIES_PAGE === 'true' && (
          <Route
            element={
              <PrivateRoute>
                <CategoriesPage />
              </PrivateRoute>
            }
            path="/categories"
          ></Route>
        )}
        <Route
          element={
            <PrivateRoute>
              <LabelsPage />
            </PrivateRoute>
          }
          path="/labels"
        ></Route>
        <Route
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
          path="/"
        ></Route>
        <Route
          element={
            <PublicRoute>
              <Navigate to="/" />
            </PublicRoute>
          }
          path="*"
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
