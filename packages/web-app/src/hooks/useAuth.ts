import {
  getAdditionalUserInfo,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login, logout } from '../state/slices/userSlice';
import { RootState, store } from '../state/store';
import { asciiLogo } from '../utils';

export const useAuth = (): boolean => {
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const isLoggedIn = store.getState().user.email !== '';

    const onAuthStateChangedHandler = async (user: User | null) => {
      if (user && !isLoggedIn) {
        const credential = await getRedirectResult(auth);
        dispatch(
          login({ isNew: credential ? getAdditionalUserInfo(credential)?.isNewUser : false, user })
        );

        console.log(asciiLogo);
      } else {
        dispatch(logout());
      }
    };

    onAuthStateChanged(auth, (user) => void onAuthStateChangedHandler(user));
  }, [dispatch]);

  return isLoading;
};
