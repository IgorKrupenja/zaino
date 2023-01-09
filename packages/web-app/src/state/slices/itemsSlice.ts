import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '@zaino/shared';

import { db, deleteDocuments } from '../../firebase';
import { RootState } from '../store';
import { decrementItemCount } from './labelsSlice';

export const addItem = createAsyncThunk<
  // Return type of the payload creator
  void,
  // First argument to the payload creator
  Item,
  // Types for ThunkAPI like dispatch and getState
  { state: RootState }
>('items/addItem', async (item, { getState }) => {
  const { id, ...firestoreData } = item;
  await db
    .collection(`users/${getState().user.uid}/items`)
    .doc(id)
    .set({ ...firestoreData });
});

export const updateItem = createAsyncThunk<void, Item, { state: RootState }>(
  'items/updateItem',
  async (item, { getState }) => {
    const { id, ...firestoreData } = item;
    await db
      .collection(`users/${getState().user.uid}/items`)
      .doc(id)
      .update({ ...firestoreData });
  }
);

export const batchUpdateItems = createAsyncThunk<void, Item[], { state: RootState }>(
  'items/batchUpdateItems',
  async (items, { getState }) => {
    let batch = db.batch();

    let i = 0;
    for (const item of items) {
      const { id, ...firestoreData } = item;
      const ref = db.collection(`users/${getState().user.uid}/items`).doc(id);
      batch.update(ref, { ...firestoreData });
      i++;
      // Firestore only allows 500 batch operations in a single batch.
      if (i > 490) {
        i = 0;
        await batch.commit();
        batch = db.batch();
      }
    }

    if (i > 0) await batch.commit();
  }
);

export const deleteItem = createAsyncThunk<void, Item, { state: RootState }>(
  'items/deleteItem',
  async (item, { getState, dispatch }) => {
    item.labelIds?.forEach((labelId) =>
      dispatch(decrementItemCount({ itemQuantity: item.quantity, labelId }))
    );
    await db.collection(`users/${getState().user.uid}/items`).doc(item.id).delete();
  }
);

export const batchDeleteItems = createAsyncThunk<void, Item[], { state: RootState }>(
  'items/batchDeleteItems',
  async (items, { getState, dispatch }) => {
    items.forEach((item) =>
      item.labelIds?.forEach((labelId) =>
        dispatch(decrementItemCount({ itemQuantity: item.quantity, labelId }))
      )
    );
    await deleteDocuments(
      `users/${getState().user.uid}/items`,
      items.map((item) => item.id)
    );
  }
);

const initialState: Item[] = [];

const itemsSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(addItem.pending, (state, action) => {
      state.push(action.meta.arg);
    });
    builder.addCase(updateItem.pending, (state, action) => {
      const update = action.meta.arg;
      const index = state.findIndex((item) => item.id === update.id);
      state[index] = update;
    });
    builder.addCase(batchUpdateItems.pending, (state, action) => {
      action.meta.arg.forEach((update) => {
        const index = state.findIndex((item) => item.id === update.id);
        state[index] = update;
      });
    });
    builder.addCase(deleteItem.pending, (state, action) => {
      state.splice(
        state.findIndex((item) => item.id === action.meta.arg.id),
        1
      );
    });
    builder.addCase(batchDeleteItems.pending, (state, action) => {
      action.meta.arg.forEach((itemToDelete) => {
        state.splice(
          state.findIndex((item) => item.id === itemToDelete.id),
          1
        );
      });
    });
    // TODO: add rejected handling here, #78
  },
  initialState,
  name: 'items',
  reducers: {
    addItems: (state, action: PayloadAction<Item[]>) => {
      action.payload.forEach((item) => state.push(item));
    },
    resetItemsState: () => initialState,
  },
});

export const { resetItemsState, addItems } = itemsSlice.actions;
export const itemsReducer = itemsSlice.reducer;
