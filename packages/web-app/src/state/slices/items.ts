import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '@zaino/shared/';
import deleteDocuments from '../../firebase/deleteDocuments';
import db from '../../firebase/firebase';
import processBatchIncrement from '../../firebase/processBatchIncrement';
import { RootState } from '../store';
import { decrementItemCount } from './labels';

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
  'items/batchUpdateItems',
  async (items, { getState }) => {
    // use batch to write to DB as can have a significant number of items here
    let batch = db.batch();

    let i = 0;
    for (const item of items) {
      const { id, ...firestoreData } = item;
      const ref = db.collection(`users/${getState().auth.uid}/items`).doc(id);
      batch.update(ref, { ...firestoreData });
      ({ i, batch } = await processBatchIncrement(i, batch));
    }

    if (i > 0) await batch.commit();
  }
);

export const deleteItem = createAsyncThunk<void, Item, { state: RootState }>(
  'items/deleteItem',
  async (item, { getState, dispatch }) => {
    // also decrement counts for related labels
    item.labelIds?.forEach(labelId =>
      dispatch(decrementItemCount({ labelId, itemQuantity: item.quantity }))
    );
    await db.collection(`users/${getState().auth.uid}/items`).doc(item.id).delete();
  }
);

export const batchDeleteItems = createAsyncThunk<void, Item[], { state: RootState }>(
  'items/batchDeleteItems',
  async (items, { getState }) => {
    await deleteDocuments(
      `users/${getState().auth.uid}/items`,
      items.map(item => item.id)
    );
  }
);

const initialState: Item[] = [];

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    loadItems: (state, action: PayloadAction<Item[]>) => {
      action.payload.forEach(item => state.push(item));
    },
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
        state.findIndex(item => item.id === action.meta.arg.id),
        1
      );
    });
    builder.addCase(batchUpdateItems.pending, (state, action) => {
      action.meta.arg.forEach(update => {
        const index = state.findIndex(item => item.id === update.id);
        state[index] = update;
      });
    });
    builder.addCase(batchDeleteItems.pending, (state, action) => {
      action.meta.arg.forEach(itemToDelete => {
        state.splice(
          state.findIndex(item => item.id === itemToDelete.id),
          1
        );
      });
    });
    // todo possibly add rejected handling here, #78
  },
});

export const { resetItemsState, loadItems } = itemsSlice.actions;
export default itemsSlice.reducer;
