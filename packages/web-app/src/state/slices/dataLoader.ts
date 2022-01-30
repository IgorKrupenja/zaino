import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, Item, Label } from '@zaino/shared';
import type firebase from 'firebase/compat';
import { batch } from 'react-redux';
import db from '../../firebase/firebase';
import { RootState } from '../store';
import { loadCategories } from './categories';
import { loadItems } from './items';
import { loadLabels } from './labels';

const processSnapshotData = (
  snapshots: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>[]
) => {
  return snapshots.map((collection) =>
    collection.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  ) as [Item[], Label[], Category[]];
};

// todo does it belong here?
export const loadUserData = createAsyncThunk<void, string, { state: RootState }>(
  'dataLoader/loadUserData',
  async (uid, { dispatch }) => {
    // get item and label refs from Firestore asynchronously for faster data loading
    const snapshots = await Promise.all([
      db.collection(`users/${uid}/items`).get(),
      db.collection(`users/${uid}/labels`).get(),
      db.collection(`users/${uid}/categories`).get(),
    ]);
    const [items, labels, categories] = processSnapshotData(snapshots);

    batch(() => {
      dispatch(loadItems(items));
      dispatch(loadLabels({ labels, items }));
      dispatch(loadCategories({ categories, items }));
    });
  }
);

// todo does it belong here?
export const loadDemoData = createAsyncThunk<void, string, { state: RootState }>(
  'dataLoader/loadDemoData',
  async (uid, { dispatch }) => {
    // loads demo items/labels only
    const snapshots = await Promise.all([
      db.collection(`users/${uid}/items`).where('isFromDemoData', '==', true).get(),
      db.collection(`users/${uid}/labels`).where('isFromDemoData', '==', true).get(),
    ]);
    const [items, labels] = processSnapshotData(snapshots);

    batch(() => {
      dispatch(loadItems(items));
      dispatch(loadLabels({ labels, items }));
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
