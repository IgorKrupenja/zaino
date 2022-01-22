import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../state/store';

type PublicRouteProps = {
  children: ReactNode;
};

/**
 * Public route, shown only if user is NOT logged in.
 */
export const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = useSelector((state: RootState) => !!state.user.uid);

  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};
