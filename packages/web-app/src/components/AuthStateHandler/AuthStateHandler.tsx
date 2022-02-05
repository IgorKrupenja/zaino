import {
  getAdditionalUserInfo,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../state/slices/userSlice';
import { asciiLogo } from '../../utils';
import { Loader } from '../Common/Misc/Loader';

type AuthStateHandlerProps = {
  children: ReactNode;
};

export const AuthStateHandler = ({ children }: AuthStateHandlerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const auth = getAuth();

    const onAuthStateChangeHandler = async (user: User | null) => {
      if (user) {
        setIsLoading(true);

        const credential = await getRedirectResult(auth);
        dispatch(
          login({ user, isNew: credential ? getAdditionalUserInfo(credential)?.isNewUser : false })
        );

        console.log(asciiLogo);

        setIsLoading(false);
      } else {
        dispatch(logout());
        setIsLoading(false);
      }
    };

    onAuthStateChanged(auth, (user) => void onAuthStateChangeHandler(user));
  }, [dispatch]);

  return <>{isLoading ? <Loader /> : children}</>;
};