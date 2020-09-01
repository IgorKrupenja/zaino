import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firebase, googleAuthProvider } from '../../firebase/firebase';

export const login = createAsyncThunk('items/login', async () => {
  await firebase.auth().signInWithRedirect(googleAuthProvider);
});

export const logout = createAsyncThunk('items/login', async () => {
  await firebase.auth().signOut();
});

const authSlice = createSlice({
  name: 'items',
  initialState: { uid: '' },
  reducers: {
    // called from app.tsx where onAuthStateChanged can provide uid
    setUid: (state, action) => {
      state.uid = action.payload as string;
    },
  },
});

export const { setUid } = authSlice.actions;
export default authSlice.reducer;
