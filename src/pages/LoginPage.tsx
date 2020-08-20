import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../state/slices/auth';

export const LoginPage = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(login())}>Sign in with Google</button>
    </div>
  );
};

export default LoginPage;
