import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db from '../firebase/firebase';

export const loadLabels = createAsyncThunk('labels/loadLabels', async (dummy, { getState }) => {
  const docRef = await db.collection(`users/${getState().auth.uid}/labels`).get();
  return docRef.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addLabel = createAsyncThunk('labels/addLabel', async (label, { getState }) => {
  const docRef = await db.collection(`users/${getState().auth.uid}/labels`).add({ ...label });
  return { id: docRef.id, ...label };
});

const labelsSlice = createSlice({
  name: 'labels',
  initialState: [],
  reducers: {
    // reset action to be executed on logout
    resetLabelsState: () => [],
  },
  extraReducers: {
    [loadLabels.fulfilled]: (state, action) => {
      action.payload.forEach(item => state.push(item));
    },
    [addLabel.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { resetLabelsState } = labelsSlice.actions;
export default labelsSlice.reducer;
