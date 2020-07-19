import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import db from '../firebase/firebase';

// todo check if all exports are used

export const addItem = createAsyncThunk('users/addItem', async item => {
  const docRef = await db.collection('items').add({ ...item });
  return { id: docRef.id, ...item };
});

export const loadItems = createAsyncThunk('users/addItem', async () => {
  const docRef = await db.collection('items').get();
  const items = docRef.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return items;
});

export const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    // todo remove?
    addItemLocal: (state, action) => {
      state.push({ id: uuid(), ...action.payload });
    },
  },
  extraReducers: {
    [addItem.fulfilled]: (state, action) => {
      state.push({ ...action.payload });
    },
    [loadItems.fulfilled]: (state, action) => {
      action.payload.forEach(item => state.push(item));
    },
  },
});

export const { addItemLocal } = itemsSlice.actions;
export default itemsSlice.reducer;
