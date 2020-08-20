import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import db from '../../firebase/firebase';
import { Item } from '../../types/items';
import { Label } from '../../types/labels';
import { RootState } from '../store';

export const addLabel = createAsyncThunk<
  // Return type of the payload creator
  void,
  // First argument to the payload creator
  Label,
  // Types for ThunkAPI
  { state: RootState }
>('labels/addLabel', async (label, { getState }) => {
  // separate id from other item properties as id's are not stored as document keys in Firestore
  // also not including itemCount as it is not stored in DB
  const { id, itemCount, ...firestoreData } = label;
  await db
    .collection(`users/${getState().auth.uid}/labels`)
    .doc(id)
    .set({ ...firestoreData });
});

export const updateLabel = createAsyncThunk<void, Label, { state: RootState }>(
  'labels/updateLabel',
  async (item, { getState }) => {
    const { id, itemCount, ...firestoreData } = item;
    await db
      .collection(`users/${getState().auth.uid}/labels`)
      .doc(id)
      .update({ ...firestoreData });
  }
);

// separate variable to annotate type
const initialState: Label[] = [];

const labelsSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    loadLabels: (state, action: PayloadAction<{ labels: Label[]; items: Item[] }>) => {
      const labels = action.payload.labels;
      // compute item counts for each label as these are not stored in Firestore
      // these counts are used on LabelsPage
      action.payload.items.forEach(item => {
        item.labelIds?.forEach(labelId => {
          const label = labels.find(label => label.id === labelId);
          if (label) label.itemCount = label.itemCount ? (label.itemCount += 1) : 1;
        });
      });
      labels.forEach(label => {
        // set 0 count for labels w/o items
        if (!label.itemCount) label.itemCount = 0;
        return state.push(label);
      });
    },
    // increment and decrement separate from update in order not to write to Firestore
    // each time items count is changed for a label
    incrementItemCount: (state, action: PayloadAction<string>) => {
      const index = state.findIndex(label => label.id === action.payload);
      state[index].itemCount = state[index].itemCount += 1;
    },
    decrementItemCount: (state, action: PayloadAction<string>) => {
      const index = state.findIndex(label => label.id === action.payload);
      state[index].itemCount = state[index].itemCount -= 1;
    },
    // reset action to be executed on logout
    resetLabelsState: () => [],
  },
  extraReducers: builder => {
    builder.addCase(addLabel.pending, (state, action) => {
      state.push(action.meta.arg);
    });
    builder.addCase(updateLabel.pending, (state, action) => {
      const update = action.meta.arg;
      const index = state.findIndex(label => label.id === update.id);
      state[index] = update;
    });
    // todo possibly add rejected handling here, #78
  },
});

export const {
  loadLabels,
  incrementItemCount,
  decrementItemCount,
  resetLabelsState,
} = labelsSlice.actions;
export default labelsSlice.reducer;
