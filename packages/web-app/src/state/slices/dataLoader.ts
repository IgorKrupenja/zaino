import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, Item, Label } from '@zaino/shared';
import { batch } from 'react-redux';
import type firebase from 'firebase';
import db from '../../firebase/firebase';
import { RootState } from '../store';
import { loadItems } from './items';
import { loadLabels } from './labels';
import { loadCategories } from './categories';

/**
 * Process Firestore data to get Items and Labels as used in the app.
 *
 * @param snapshots Two snapshots with item and label data from Firestore.
 */
const processData = (
  snapshots: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>[]
) => {
  return snapshots.map(collection =>
    collection.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  ) as [Item[], Label[], Category[]];
};

export const loadUserData = createAsyncThunk<void, string, { state: RootState }>(
  'dataLoader/loadUserData',
  async (uid, { dispatch }) => {
    // get item and label refs from Firestore asynchronously for faster data loading
    const snapshots = await Promise.all([
      db.collection(`users/${uid}/items`).get(),
      db.collection(`users/${uid}/labels`).get(),
      db.collection(`users/${uid}/categories`).get(),
    ]);
    const [items, labels, categories] = processData(snapshots);

    batch(() => {
      dispatch(loadItems(items));
      dispatch(loadLabels({ labels, items }));
      dispatch(loadCategories({ categories, items }));
    });
  }
);

export const loadDemoData = createAsyncThunk<void, string, { state: RootState }>(
  'dataLoader/loadDemoData',
  async (uid, { dispatch }) => {
    // loads demo items/labels only
    const snapshots = await Promise.all([
      db.collection(`users/${uid}/items`).where('isFromDemoData', '==', true).get(),
      db.collection(`users/${uid}/labels`).where('isFromDemoData', '==', true).get(),
    ]);
    const [items, labels] = processData(snapshots);

    batch(() => {
      dispatch(loadItems(items));
      dispatch(loadLabels({ labels, items }));
    });
  }
);

// handles app loading state to display page loading indicators
// at the moment this is only used when demo data is loading
// in the future, this can also be used to address #62 and #117
const dataLoaderSlice = createSlice({
  name: 'dataLoader',
  initialState: { isLoading: false },
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadDemoData.fulfilled, state => {
      state.isLoading = false;
    });
  },
});

export const { setIsLoading } = dataLoaderSlice.actions;

export default dataLoaderSlice.reducer;
