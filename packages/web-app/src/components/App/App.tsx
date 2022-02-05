import { Category, Item, Label } from '@zaino/shared';
import {
  getAdditionalUserInfo,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { StrictMode, useEffect, useState } from 'react';
import Media from 'react-media';
import { batch, Provider } from 'react-redux';
import { db, getObjectsFromSnapshots } from '../../firebase';
import AppRouter from '../../routes/AppRouter';
import { addCategories } from '../../state/slices/categoriesSlice';
import { addItems } from '../../state/slices/itemsSlice';
import { addLabels } from '../../state/slices/labelsSlice';
import { login, logout } from '../../state/slices/userSlice';
import { store } from '../../state/store';
import { asciiLogo } from '../../utils';
import { Loader } from '../Common/Misc/Loader';
import { MobilePlaceholder } from '../pages/MobilePlaceholder';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loadUserData = async (uid: string) => {
    const snapshots = await Promise.all([
      db.collection(`users/${uid}/items`).get(),
      db.collection(`users/${uid}/labels`).get(),
      db.collection(`users/${uid}/categories`).get(),
    ]);

    const [items, labels, categories] = getObjectsFromSnapshots(snapshots) as [
      Item[],
      Label[],
      Category[]
    ];

    batch(() => {
      store.dispatch(addItems(items));
      store.dispatch(addLabels({ labels, items }));
      store.dispatch(addCategories({ categories, items }));
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const auth = getAuth();

    const onAuthStateChangeHandler = async (user: User | null) => {
      if (user) {
        setIsLoading(true);

        const credential = await getRedirectResult(auth);
        await store.dispatch(
          login({ user, isNew: credential ? getAdditionalUserInfo(credential)?.isNewUser : false })
        );
        await loadUserData(user.uid);

        console.log(asciiLogo);

        setIsLoading(false);
      } else {
        await store.dispatch(logout());
        setIsLoading(false);
      }
    };

    onAuthStateChanged(auth, (user) => void onAuthStateChangeHandler(user));
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
