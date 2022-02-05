import { Category, Item, Label } from '@zaino/shared';
import {
  getAdditionalUserInfo,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { ReactNode, useEffect, useState } from 'react';
import { batch, useDispatch } from 'react-redux';
import { db, getObjectsFromSnapshots } from '../../firebase';
import { addCategories } from '../../state/slices/categoriesSlice';
import { addItems } from '../../state/slices/itemsSlice';
import { addLabels } from '../../state/slices/labelsSlice';
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
        dispatch(addItems(items));
        dispatch(addLabels({ labels, items }));
        dispatch(addCategories({ categories, items }));
      });
    };

    const onAuthStateChangeHandler = async (user: User | null) => {
      if (user) {
        setIsLoading(true);

        const credential = await getRedirectResult(auth);
        dispatch(
          login({ user, isNew: credential ? getAdditionalUserInfo(credential)?.isNewUser : false })
        );
        await loadUserData(user.uid);

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
