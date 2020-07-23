import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db from '../firebase/firebase';

// dummy argument needed as ThunkAPI is always the second argument
// https://github.com/reduxjs/redux-toolkit/issues/605
export const loadItems = createAsyncThunk('items/loadItems', async (dummy, { getState }) => {
  const docRef = await db.collection(`users/${getState().auth.uid}/items`).get();
  return docRef.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addItem = createAsyncThunk('items/addItem', async (item, { getState }) => {
  const docRef = await db.collection(`users/${getState().auth.uid}/items`).add({ ...item });
  return { id: docRef.id, ...item };
});

export const editItem = createAsyncThunk('items/editItem', async (item, { getState }) => {
  await db
    .collection(`users/${getState().auth.uid}/items`)
    .doc(item.id)
    .update({ ...item });
  return { id: item.id, ...item };
});

export const deleteItem = createAsyncThunk('items/deleteItem', async (id, { getState }) => {
  await db.collection(`users/${getState().auth.uid}/items`).doc(id).delete();
  return { id };
});

// todo move to slice
const initialState = [];

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // reset action to be executed on logout
    // todo might need to refactor when have several slices
    // todo https://stackoverflow.com/questions/59061161/how-to-reset-state-of-redux-store-when-using-configurestore-from-reduxjs-toolki
    resetItemsState: () => initialState,
  },
  extraReducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    // more info https://redux.js.org/tutorials/essentials/part-2-app-structure
    [loadItems.fulfilled]: (state, action) => {
      action.payload.forEach(item => state.push(item));
    },
    [addItem.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [editItem.fulfilled]: (state, action) => {
      // perhaps there is a more elegant way?
      state.forEach(item => {
        if (item.id === action.payload.id) {
          for (const property in item) {
            item[property] = action.payload[property];
          }
        }
      });
    },
    [deleteItem.fulfilled]: (state, action) => {
      state.splice(
        state.findIndex(item => item.id === action.payload.id),
        1
      );
    },
  },
});

export const { resetItemsState } = itemsSlice.actions;
export default itemsSlice.reducer;
