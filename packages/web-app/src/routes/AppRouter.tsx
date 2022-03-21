import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CategoriesPage } from '../components/other/CategoriesPage';
import { Loader } from '../components/common/Misc/Loader';
import { DashboardPage } from '../components/dashboard/DashboardPage';
import { LabelsPage } from '../components/labels/LabelsPage';
import { LoginPage } from '../components/other/LoginPage';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const PrivacyPolicy = lazy(() => import('../components/other/PrivacyPolicyPage'));

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
        {process.env.REACT_APP_SHOW_CATEGORIES_PAGE === 'true' && (
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <CategoriesPage />
              </PrivateRoute>
            }
          ></Route>
        )}
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
