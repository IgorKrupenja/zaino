import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import { RootState } from '../state/store';

type PrivateRouteProps = {
  path: string;
  children: ReactNode;
  exact?: boolean;
};

/**
 * Private route, shown only if user is logged in.
 * If user tries to access such a route when not logged in, redirect to root (login page).
 */
export const PrivateRoute = ({ path, children }: PrivateRouteProps) => {
  const isAuthenticated = useSelector((state: RootState) => !!state.user.uid);

  return isAuthenticated ? <Route path={path}>{children}</Route> : <Navigate to="/" />;
};
