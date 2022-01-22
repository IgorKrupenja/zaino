import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import copyCollection from '../../firebase/copyCollection';
import db, { firebase, googleAuthProvider } from '../../firebase/firebase';
import { resetCategoriesState } from './categories';
import { resetItemsState } from './items';
import { resetLabelsState } from './labels';

export const login = createAsyncThunk('user/login', async () => {
  await firebase.auth().signInWithRedirect(googleAuthProvider);
});

export const handleLoginRedirect = createAsyncThunk(
  'user/handleLoginRedirect',
  async ({ user, isNew }: { user: firebase.User; isNew?: boolean }) => {
    if (isNew) {
      // currently no business logic behind firstLoginAt
      // it is only needed to properly create a document for the user in Firestore
      // as Firestore does not correctly create empty documents
      await db
        .collection(`users`)
        .doc(user.uid)
        .set({ firstLoginAt: new Date().toISOString(), eMail: user.email });
      // add default categories for every new user
      await copyCollection('common/defaults/categories', `users/${user.uid}/categories`);
    }
  }
);

export const logout = createAsyncThunk('user/logout', async (unused, { dispatch }) => {
  await firebase.auth().signOut();
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
  extraReducers: builder => {
    builder.addCase(logout.pending, () => initialState);
    builder.addCase(handleLoginRedirect.pending, (state, action) => {
      const user = action.meta.arg.user;
      return {
        uid: user.uid,
        // types for these are string | null but null seems to apply to anonymous sign in only
        // as app does not support anonymous sign anyway, casting as strings
        name: user.displayName as string,
        email: user.email as string,
        // if user has not set an photo in Google account,
        // Google conveniently provides an image with name's first letter
        photoUrl: user.photoURL as string,
      };
    });
  },
});

export default userSlice.reducer;
