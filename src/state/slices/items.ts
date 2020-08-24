import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import db from '../../firebase/firebase';
import { Item } from '../../types/Item';
import { Label } from '../../types/Label';
import { RootState } from '../store';
import { loadLabels } from './labels';

export const loadItems = createAsyncThunk<Item[], string, { state: RootState }>(
  'items/loadItems',
  async (uid, { dispatch }) => {
    // get item and label refs from Firestore asynchronously for faster data loading
    const refs = await Promise.all([
      db.collection(`users/${uid}/items`).get(),
      db.collection(`users/${uid}/labels`).get(),
    ]);
    const [items, labels] = refs.map(ref =>
      ref.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    ) as [Item[], Label[]];

    // share data with labels reducer
    dispatch(loadLabels({ labels, items }));
    return items;
  }
);

export const addItem = createAsyncThunk<
  // Return type of the payload creator
  void,
  // First argument to the payload creator
  Item,
  // Types for ThunkAPI
  { state: RootState }
>('items/addItem', async (item, { getState }) => {
  // separate id from other item properties as id's are not stored as document keys in Firestore
  const { id, ...firestoreData } = item;
  await db
    .collection(`users/${getState().auth.uid}/items`)
    .doc(id)
    .set({ ...firestoreData });
});

export const updateItem = createAsyncThunk<void, Item, { state: RootState }>(
  'items/updateItem',
  async (item, { getState }) => {
    const { id, ...firestoreData } = item;
    await db
      .collection(`users/${getState().auth.uid}/items`)
      .doc(id)
      .update({ ...firestoreData });
  }
);

export const batchUpdateItems = createAsyncThunk<void, Item[], { state: RootState }>(
  'items/batchRemoveLabel',
  async (items, { getState }) => {
    // use batch to write to DB as can have a significant number of items here
    const batch = db.batch();
    items.forEach(item => {
      const { id, ...firestoreData } = item;
      const ref = db.collection(`users/${getState().auth.uid}/items`).doc(id);
      batch.update(ref, { ...firestoreData });
    });
    await batch.commit();
  }
);

export const deleteItem = createAsyncThunk<void, string, { state: RootState }>(
  'items/deleteItem',
  async (id, { getState }) => {
    await db.collection(`users/${getState().auth.uid}/items`).doc(id).delete();
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
      action.payload.forEach(item => state.push(item));
    });
    builder.addCase(addItem.pending, (state, action) => {
      state.push(action.meta.arg);
    });
    builder.addCase(updateItem.pending, (state, action) => {
      const update = action.meta.arg;
      const index = state.findIndex(item => item.id === update.id);
      state[index] = update;
    });
    builder.addCase(deleteItem.pending, (state, action) => {
      state.splice(
        state.findIndex(item => item.id === action.meta.arg),
        1
      );
    });
    builder.addCase(batchUpdateItems.pending, (state, action) => {
      action.meta.arg.forEach(update => {
        const index = state.findIndex(item => item.id === update.id);
        state[index] = update;
      });
    });
    // todo possibly add rejected handling here, #78
  },
});

export const { resetItemsState } = itemsSlice.actions;
export default itemsSlice.reducer;
