import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => !!state.auth.uid);

  return (
    <Route
      // passing stuff like path and exact
      {...rest}
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
