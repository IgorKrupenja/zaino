import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db from '../firebase/firebase';

// todo check if all exports are used

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
  console.log(item);
  await db
    .collection(`users/${getState().auth.uid}/items`)
    .doc(item.id)
    .update({ ...item });
  return { id: item.id, ...item };
});

const initialState = [];

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // reset function to be called on logout
    // todo might need to refactor when have several slices
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
      state.push({ ...action.payload });
    },
    [editItem.fulfilled]: (state, action) => {
      console.log('edit item success!');
      // perhaps there is a more elegant way?
      state.forEach(item => {
        if (item.id === action.payload.id) {
          for (const property in item) {
            item[property] = action.payload[property];
          }
        }
      });
    },
    [editItem.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export const { resetItemsState } = itemsSlice.actions;
export default itemsSlice.reducer;
