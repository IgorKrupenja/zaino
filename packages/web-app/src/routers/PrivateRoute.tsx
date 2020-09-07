import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Header from '../components/common/Header';
import { RootState } from '../state/store';

type PrivateRouteProps = {
  component: () => JSX.Element;
  path: string;
};

/**
 * Private route for routes that are accessible for authenticated users only.
 * Needed to prevent showing empty Dashboard/Labels if users presses back after logout.
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
