import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { RootState } from '../store/store';

type PrivateRouteProps = {
  component: () => JSX.Element;
  path: string;
};

/**
 * Private route for routes that are accessible for authenticated users only.
 * Header is shown for all such routes.
 */
const PrivateRoute = ({ component: Component, path }: PrivateRouteProps) => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.uid);
  return (
    <Route
      path={path}
      component={() =>
        isAuthenticated ? (
          <>
            <Header />
            <Component />
          </>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
