import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../state/slices/auth';

export const LoginPage = () => {
  const dispatch = useDispatch();
  return (
    <main>
      <button onClick={() => dispatch(login())}>Sign in with Google</button>
    </main>
  );
};

export default LoginPage;
