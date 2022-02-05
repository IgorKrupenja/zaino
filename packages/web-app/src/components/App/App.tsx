import { StrictMode, useEffect, useState } from 'react';
import Media from 'react-media';
import { Provider } from 'react-redux';
import { firebase } from '../../firebase/firebase';
import AppRouter from '../../routes/AppRouter';
import { loadUserData } from '../../state/slices/demoDataSlice';
import { login, logout } from '../../state/slices/userSlice';
import { store } from '../../state/store';
import { asciiLogo } from '../../utils';
import { Loader } from '../Common/Misc/Loader';
import { MobilePlaceholder } from '../pages/MobilePlaceholder';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoading(true);

        const credential = await firebase.auth().getRedirectResult();
        await store.dispatch(login({ user, isNew: credential.additionalUserInfo?.isNewUser }));
        await store.dispatch(loadUserData(user.uid));

        console.log(asciiLogo);

        setIsLoading(false);
      } else {
        await store.dispatch(logout());
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <StrictMode>
      <Provider store={store}>
        <Media queries={{ small: { maxWidth: 599 } }}>
          {(matches) =>
            matches.small ? <MobilePlaceholder /> : isLoading ? <Loader /> : <AppRouter />
          }
        </Media>
      </Provider>
    </StrictMode>
  );
};
