import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import db, { firebase, googleAuthProvider } from '../../firebase/firebase';
import copyCollection from '../../firebase/utils/copyCollection';
import { resetCategoriesState } from './categoriesSlice';
import { resetItemsState } from './itemsSlice';
import { resetLabelsState } from './labelsSlice';

// todo move to service as not state related - or maybe where stuff is moved from index.tsx
export const login_TEMP_MOVE_TO_SERVICE = createAsyncThunk(
  'user/login_TEMP_MOVE_TO_SERVICE',
  async () => {
    await firebase.auth().signInWithRedirect(googleAuthProvider);
  }
);

export const login = createAsyncThunk(
  'user/login',
  async ({ user, isNew }: { user: firebase.User; isNew?: boolean }) => {
    if (isNew) {
      // Currently no business logic behind email field.
      // It is only needed to properly create a document for the user in Firestore
      // as Firestore does not correctly create empty documents.
      await db
        .collection('users')
        .doc(user.uid)
        .set({ firstLoginAt: new Date().toISOString(), email: user.email });
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
    builder.addCase(login.pending, (state, action) => {
      const user = action.meta.arg.user;
      return {
        uid: user.uid,
        // Types for these are string | null but null seems to apply to anonymous sign in only
        name: user.displayName as string,
        email: user.email as string,
        photoUrl: user.photoURL as string,
      };
    });
  },
});

export const userReducer = userSlice.reducer;
