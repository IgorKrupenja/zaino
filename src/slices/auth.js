import { createSlice } from '@reduxjs/toolkit';
import { firebase, googleAuthProvider } from '../firebase/firebase';

// todo check if all exports are used

export const authSlice = createSlice({
  name: 'items',
  initialState: { uid: '' },
  reducers: {
    login: () => {
      firebase.auth().signInWithPopup(googleAuthProvider);
    },
    // called from app.jsx where onAuthStateChanged can provide uid
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
