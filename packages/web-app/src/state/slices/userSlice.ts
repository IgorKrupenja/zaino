import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Category, Item, Label } from '@zaino/shared';
import { User } from 'firebase/auth';
import { batch } from 'react-redux';
import { copyCollection, db, getObjectsFromSnapshots } from '../../firebase';
import { addCategories, resetCategoriesState } from './categoriesSlice';
import { addItems, resetItemsState } from './itemsSlice';
import { addLabels, resetLabelsState } from './labelsSlice';

export const login = createAsyncThunk(
  'user/login',
  async ({ user, isNew }: { user: User; isNew?: boolean }, { dispatch }) => {
    if (isNew) {
      // Currently no business logic behind email field.
      await db
        .collection('users')
        .doc(user.uid)
        .set({ firstLoginAt: new Date().toISOString(), email: user.email });
      await copyCollection('common/defaults/categories', `users/${user.uid}/categories`);
    }

    const snapshots = await Promise.all([
      db.collection(`users/${user.uid}/items`).get(),
      db.collection(`users/${user.uid}/labels`).get(),
      db.collection(`users/${user.uid}/categories`).get(),
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
  }
);

export const logout = createAsyncThunk('user/logout', (unused, { dispatch }) => {
  batch(() => {
    dispatch(resetItemsState());
    dispatch(resetLabelsState());
    dispatch(resetCategoriesState());
  });
});

const initialState = { uid: '', name: '', email: '', photoUrl: '', isLoading: true };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout.pending, () => initialState);
    builder.addCase(logout.fulfilled, (state, action) => ({ ...state, isLoading: false }));
    builder.addCase(login.pending, (state, action) => {
      const user = action.meta.arg.user;

      return {
        isLoading: true,
        uid: user.uid,
        // Types for these are string | null but null seems to apply to anonymous sign in only
        name: user.displayName as string,
        email: user.email as string,
        photoUrl: user.photoURL as string,
      };
    });
    builder.addCase(login.fulfilled, (state, action) => ({ ...state, isLoading: false }));
  },
});

export const userReducer = userSlice.reducer;
