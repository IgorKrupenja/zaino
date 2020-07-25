import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { RootState } from '../store/store';

type PrivateRouteProps = {
  component: () => JSX.Element;
  path: string;
};

const PrivateRoute = ({ component: Component, path }: PrivateRouteProps) => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.uid);
  return (
    <Route
      path={path}
      component={() =>
        isAuthenticated ? (
          <div>
            <Header />
            <Component />
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
