import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Item, Label } from '@zaino/shared';
import { batch } from 'react-redux';
import { copyCollection, db, getObjectsFromSnapshots } from '../../firebase';
import { RootState } from '../store';
import { addItems } from './itemsSlice';
import { addLabels } from './labelsSlice';

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

    const [items, labels] = getObjectsFromSnapshots(snapshots) as [Item[], Label[]];

    batch(() => {
      dispatch(addItems(items));
      dispatch(addLabels({ labels, items }));
    });
  }
);

// TODO: similar approach should also be used to address #117 in the future.
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
