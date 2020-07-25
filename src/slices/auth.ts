import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { firebase, googleAuthProvider } from '../firebase/firebase';

const authSlice = createSlice({
  name: 'items',
  initialState: { uid: '' },
  reducers: {
    login: () => {
      firebase.auth().signInWithRedirect(googleAuthProvider);
      // firebase.auth().signInWithPopup(googleAuthProvider);
    },
    // called from app.tsx where onAuthStateChanged can provide uid
    setUid: (state, action) => {
      state.uid = action.payload;
    },
    logout: state => {
      firebase.auth().signOut();
      state.uid = '';
    },
  },
});

export const { login, setUid, logout } = authSlice.actions;
export default authSlice.reducer;
