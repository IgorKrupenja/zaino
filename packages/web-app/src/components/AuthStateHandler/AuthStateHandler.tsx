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
import { RootState } from '../../state/store';
import { asciiLogo } from '../../utils';
import { Loader } from '../Common/Misc/Loader';

type AuthStateHandlerProps = {
  children: ReactNode;
};

export const AuthStateHandler = ({ children }: AuthStateHandlerProps) => {
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const isLoggedIn = useSelector((state: RootState) => state.user.email !== '');

  console.log('AuthStateHandler: isLoading', isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('use effect!');
    const auth = getAuth();

    const onAuthStateChangeHandler = async (user: User | null) => {
      console.log('onAuthStateChangeHandler: user', user);
      if (user) {
        const credential = await getRedirectResult(auth);
        dispatch(
          login({ user, isNew: credential ? getAdditionalUserInfo(credential)?.isNewUser : false })
        );

        console.log(asciiLogo);
      } else {
        dispatch(logout());
      }
    };

    // ntodo proper location
    // todo remove logs
    onAuthStateChanged(auth, (user) => !isLoggedIn && void onAuthStateChangeHandler(user));
  }, [dispatch, isLoggedIn]);

  return <>{isLoading ? <Loader /> : children}</>;
};
