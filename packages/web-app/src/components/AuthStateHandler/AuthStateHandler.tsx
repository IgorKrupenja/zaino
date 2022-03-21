import {
  getAdditionalUserInfo,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../state/slices/userSlice';
import { RootState, store } from '../../state/store';
import { asciiLogo } from '../../utils';
import { Loader } from '../common/Misc/Loader';

type AuthStateHandlerProps = {
  children: ReactNode;
};

export const AuthStateHandler = ({ children }: AuthStateHandlerProps) => {
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const isLoggedIn = store.getState().user.email !== '';

    const onAuthStateChangedHandler = async (user: User | null) => {
      if (user && !isLoggedIn) {
        const credential = await getRedirectResult(auth);
        dispatch(
          login({ user, isNew: credential ? getAdditionalUserInfo(credential)?.isNewUser : false })
        );

        console.log(asciiLogo);
      } else {
        dispatch(logout());
      }
    };

    onAuthStateChanged(auth, (user) => void onAuthStateChangedHandler(user));
  }, [dispatch]);

  return <>{isLoading ? <Loader /> : children}</>;
};
