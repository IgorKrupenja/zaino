import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db from '../firebase/firebase';
import { Label } from '../types/types';
import { RootState } from '../store/store';

export const loadLabels = createAsyncThunk('labels/loadLabels', async (uid: string) => {
  const docRef = await db.collection(`users/${uid}/labels`).get();
  return docRef.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Label[];
});

export const addLabel = createAsyncThunk<
  // Return type of the payload creator
  void,
  // First argument to the payload creator
  Label,
  // Types for ThunkAPI
  { state: RootState }
>('labels/addLabel', async (label, { getState }) => {
  // separate id from other item properties as id's are not stored as document keys in Firestore
  const { id, ...firestoreData } = label;
  await db
    .collection(`users/${getState().auth.uid}/labels`)
    .doc(id)
    .set({ ...firestoreData });
});

const initialState: Label[] = [];

const labelsSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    // reset action to be executed on logout
    resetLabelsState: () => [],
  },
  extraReducers: builder => {
    builder.addCase(loadLabels.fulfilled, (state, action) => {
      action.payload.forEach(item => state.push(item));
    });
    builder.addCase(addLabel.pending, (state, action) => {
      state.push(action.meta.arg);
    });
    // todo possibly add rejected handling here, #78
  },
});

export const { resetLabelsState } = labelsSlice.actions;
export default labelsSlice.reducer;
