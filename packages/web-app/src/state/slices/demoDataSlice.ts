import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Category, Item, Label } from '@zaino/shared';
import type firebase from 'firebase/compat';
import { batch } from 'react-redux';
import { copyCollection, db } from '../../firebase';
import { RootState } from '../store';
import { addCategories } from './categoriesSlice';
import { addItems } from './itemsSlice';
import { addLabels } from './labelsSlice';

// todo mb re-useable function
const processSnapshotData = (
  snapshots: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>[]
) => {
  return snapshots.map((collection) =>
    collection.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  ) as [Item[], Label[], Category[]];
};

// todo does it belong here? - no, move to ITEMS service
export const loadUserData = createAsyncThunk<void, string, { state: RootState }>(
  'demoData/loadUserData',
  async (uid, { dispatch }) => {
    const snapshots = await Promise.all([
      db.collection(`users/${uid}/items`).get(),
      db.collection(`users/${uid}/labels`).get(),
      db.collection(`users/${uid}/categories`).get(),
    ]);

    // todo and this move to index - or whenever stuff is moved from index
    const [items, labels, categories] = processSnapshotData(snapshots);

    batch(() => {
      dispatch(addItems(items));
      dispatch(addLabels({ labels, items }));
      dispatch(addCategories({ categories, items }));
    });
  }
);

// todo or maybe also move to ITEMS service and only keep loader logic here, rename loaderSlice
export const addDemoData = createAsyncThunk<void, string, { state: RootState }>(
  'demoData/addDemoData',
  async (uid, { dispatch }) => {
    const addedAt = new Date().toISOString();

    await Promise.all([
      copyCollection('common/demo-data/items', `users/${uid}/items`, addedAt),
      copyCollection('common/demo-data/labels', `users/${uid}/labels`),
    ]);

    const snapshots = await Promise.all([
      db.collection(`users/${uid}/items`).where('isFromDemoData', '==', true).get(),
      db.collection(`users/${uid}/labels`).where('isFromDemoData', '==', true).get(),
    ]);

    const [items, labels] = processSnapshotData(snapshots);

    batch(() => {
      dispatch(addItems(items));
      dispatch(addLabels({ labels, items }));
    });
  }
);

// TODO: should also be used to address #117 in the future.
const demoDataSlice = createSlice({
  name: 'demoData',
  initialState: { isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addDemoData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addDemoData.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const demoDataReducer = demoDataSlice.reducer;
