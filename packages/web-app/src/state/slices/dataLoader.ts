import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, Item, Label } from '@zaino/shared';
import type firebase from 'firebase/compat';
import { batch } from 'react-redux';
import db from '../../firebase/firebase';
import { RootState } from '../store';
import { loadCategories } from './categoriesSlice';
import { addItems } from './itemsSlice';
import { addLabels } from './labelsSlice';

const processSnapshotData = (
  snapshots: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>[]
) => {
  return snapshots.map((collection) =>
    collection.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  ) as [Item[], Label[], Category[]];
};

// todo does it belong here? - no, move to service
export const loadUserData = createAsyncThunk<void, string, { state: RootState }>(
  'dataLoader/loadUserData',
  async (uid, { dispatch }) => {
    const snapshots = await Promise.all([
      db.collection(`users/${uid}/items`).get(),
      db.collection(`users/${uid}/labels`).get(),
      db.collection(`users/${uid}/categories`).get(),
    ]);

    // todo and this move to index
    const [items, labels, categories] = processSnapshotData(snapshots);

    batch(() => {
      dispatch(addItems(items));
      dispatch(addLabels({ labels, items }));
      dispatch(loadCategories({ categories, items }));
    });
  }
);

// todo does it belong here? yes, rename to demo data slice
export const loadDemoData = createAsyncThunk<void, string, { state: RootState }>(
  'dataLoader/loadDemoData',
  async (uid, { dispatch }) => {
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

// Handles app loading state to display page loading indicators.
// At the moment this is only used when demo data is loading.
// In the future, this can also be used to address  #117.
const dataLoaderSlice = createSlice({
  name: 'dataLoader',
  initialState: { isLoading: false },
  reducers: {
    // todo rethink - perhaps move part of DemoData here, and set on loadDemoData.pending
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadDemoData.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setIsLoading } = dataLoaderSlice.actions;

export default dataLoaderSlice.reducer;
