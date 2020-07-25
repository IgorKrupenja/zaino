import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db from '../firebase/firebase';
import { Item, NewItemEvent } from '../types/types';
import { RootState } from '../store/store';

export const loadItems = createAsyncThunk('items/loadItems', async (uid: string) => {
  const docRef = await db.collection(`users/${uid}/items`).get();
  return docRef.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Item[];
});

export const addItem = createAsyncThunk<
  // Return type of the payload creator
  Item,
  // First argument to the payload creator
  NewItemEvent,
  // Types for ThunkAPI
  { state: RootState }
>('items/addItem', async (item, { getState }) => {
  const docRef = await db.collection(`users/${getState().auth.uid}/items`).add({ ...item });
  // adding newly-created id from DB
  return { id: docRef.id, ...item } as Item;
});

// todo maybe rename to updateItem
export const editItem = createAsyncThunk<Item, Item, { state: RootState }>(
  'items/editItem',
  async (item, { getState }) => {
    // separate idd from other item props as id's are not stored as document keys in Firestore
    const { id, ...firestoreItem } = item;
    await db
      .collection(`users/${getState().auth.uid}/items`)
      .doc(id)
      .update({ ...firestoreItem });
    return item as Item;
  }
);

export type editItemThunkAction = typeof editItem;

export const deleteItem = createAsyncThunk<string, string, { state: RootState }>(
  'items/deleteItem',
  async (id, { getState }) => {
    await db.collection(`users/${getState().auth.uid}/items`).doc(id).delete();
    return id;
  }
);

const initialState: Item[] = [];

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // reset state action to be executed on logout
    resetItemsState: () => [],
  },
  // builder used in TS so that both `state` and `action` are correctly typed
  extraReducers: builder => {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    // more info https://redux.js.org/tutorials/essentials/part-2-app-structure
    builder.addCase(loadItems.fulfilled, (state, action) => {
      action.payload.forEach(item => {
        typeof item;
        state.push(item);
      });
    });
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(editItem.fulfilled, (state, action) => {
      // todo this is sub-optimal, see #75
      state.forEach(item => {
        if (item.id === action.payload.id) {
          for (const property in item) {
            // @ts-ignore
            item[property] = action.payload[property];
          }
        }
      });
    });
    builder.addCase(deleteItem.fulfilled, (state, action) => {
      state.splice(
        state.findIndex(item => item.id === action.payload),
        1
      );
    });
  },
});

export const { resetItemsState } = itemsSlice.actions;
export default itemsSlice.reducer;
