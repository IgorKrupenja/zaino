import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../state/store';

type PrivateRouteProps = {
  children: JSX.Element;
};

/**
 * Private route, shown only if user is logged in.
 */
export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = useSelector((state: RootState) => !!state.user.uid);

  return isAuthenticated ? children : <Navigate to="/" />;
};
