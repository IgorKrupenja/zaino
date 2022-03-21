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

// TODO: perhaps move to other location or transform into a useAuthState hook - THIS IS LAST
// todo investigate duplicate entries on hot reload
export const AuthStateHandler = ({ children }: AuthStateHandlerProps) => {
  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  console.log('AuthStateHandler: isLoading', isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('use effect');
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

    onAuthStateChanged(auth, (user) => void onAuthStateChangeHandler(user));
  }, [dispatch]);

  return <>{isLoading ? <Loader /> : children}</>;
};
