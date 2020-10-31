import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from '../state/store';

type PublicRouteProps = {
  path: string;
  children: ReactNode;
  exact?: boolean;
};

/**
 * Public route, shown only if user is NOT logged in.
 * If user tries to access such a route when logged in, redirect to Dashboard.
 */
export const PublicRoute = ({ path, children, exact }: PublicRouteProps) => {
  const isAuthenticated = useSelector((state: RootState) => !!state.user.uid);

  return isAuthenticated ? (
    <Redirect to="/dashboard" />
  ) : (
    <Route to={path} exact={exact}>
      {children}
    </Route>
  );
};
