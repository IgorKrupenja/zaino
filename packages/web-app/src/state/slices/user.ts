import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import db, { firebase, googleAuthProvider } from '../../firebase/firebase';
import copyCollection from '../../firebase/utils/copyCollection';
import { resetCategoriesState } from './categories';
import { resetItemsState } from './items';
import { resetLabelsState } from './labels';

// todo move as not state related
export const login = createAsyncThunk('user/login', async () => {
  await firebase.auth().signInWithRedirect(googleAuthProvider);
});

// todo rename to login?
export const handleLoginRedirect = createAsyncThunk(
  'user/handleLoginRedirect',
  async ({ user, isNew }: { user: firebase.User; isNew?: boolean }) => {
    if (isNew) {
      // Currently no business logic behind email field.
      // It is only needed to properly create a document for the user in Firestore
      // as Firestore does not correctly create empty documents.
      await db
        .collection('users')
        .doc(user.uid)
        .set({ firstLoginAt: new Date().toISOString(), email: user.email });
      // Add default categories for every new user
      await copyCollection('common/defaults/categories', `users/${user.uid}/categories`);
    }
  }
);

export const logout = createAsyncThunk('user/logout', (unused, { dispatch }) => {
  batch(() => {
    dispatch(resetItemsState());
    dispatch(resetLabelsState());
    dispatch(resetCategoriesState());
  });
});

const initialState = { uid: '', name: '', email: '', photoUrl: '' };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout.pending, () => initialState);
    builder.addCase(handleLoginRedirect.pending, (state, action) => {
      const user = action.meta.arg.user;
      return {
        uid: user.uid,
        // types for these are string | null but null seems to apply to anonymous sign in only
        // as app does not support anonymous sign anyway, casting as strings
        name: user.displayName as string,
        email: user.email as string,
        photoUrl: user.photoURL as string,
      };
    });
  },
});

export default userSlice.reducer;
