import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item, Label } from '@zaino/shared';

import { db, deleteDocuments } from '../../firebase';
import { RootState } from '../types';
import { batchUpdateItems } from './itemsSlice';

export const addLabel = createAsyncThunk<
  // Return type of the payload creator
  void,
  // First argument to the payload creator
  Label,
  // Types for ThunkAPI
  { state: RootState }
>('labels/addLabel', async (label, { getState }) => {
  await db
    .collection(`users/${getState().user.uid}/labels`)
    .doc(label.id)
    .set({ colorName: label.colorName, name: label.name });
});

export const updateLabel = createAsyncThunk<void, Label, { state: RootState }>(
  'labels/updateLabel',
  async (label, { getState }) => {
    await db
      .collection(`users/${getState().user.uid}/labels`)
      .doc(label.id)
      .update({ colorName: label.colorName, name: label.name });
  }
);

export const deleteLabel = createAsyncThunk<void, string, { state: RootState }>(
  'labels/deleteLabel',
  async (id, { getState, dispatch }) => {
    const updatedItems = getState()
      .items.filter((item) => item.labelIds?.includes(id))
      .map((item) => {
        const labelIds = [...(item.labelIds as string[])];
        labelIds?.splice(labelIds?.indexOf(id), 1);
        return { ...item, labelIds };
      });
    await Promise.all([
      db.collection(`users/${getState().user.uid}/labels`).doc(id).delete(),
      dispatch(batchUpdateItems(updatedItems)),
    ]);
  }
);

export const batchDeleteLabels = createAsyncThunk<void, Label[], { state: RootState }>(
  'labels/batchDeleteLabels',
  async (labels, { getState }) => {
    await deleteDocuments(
      `users/${getState().user.uid}/labels`,
      labels.map((label) => label.id)
    );
  }
);

const initialState: Label[] = [];

const labelsSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(addLabel.pending, (state, action) => {
      state.push(action.meta.arg);
    });
    builder.addCase(updateLabel.pending, (state, action) => {
      const update = action.meta.arg;
      const index = state.findIndex((label) => label.id === update.id);
      state[index] = update;
    });
    builder.addCase(deleteLabel.pending, (state, action) => {
      state.splice(
        state.findIndex((label) => label.id === action.meta.arg),
        1
      );
    });
    builder.addCase(batchDeleteLabels.pending, (state, action) => {
      action.meta.arg.forEach((labelToDelete) => {
        state.splice(
          state.findIndex((label) => label.id === labelToDelete.id),
          1
        );
      });
    });
    // TODO: possibly add rejected handling here, #78
  },
  initialState,
  name: 'labels',
  reducers: {
    addLabels: (state, action: PayloadAction<{ items: Item[]; labels: Label[] }>) => {
      const labels = action.payload.labels;
      action.payload.items.forEach((item) => {
        item.labelIds?.forEach((labelId) => {
          const label = labels.find((label) => label.id === labelId);
          if (label) {
            label.itemUniqueCount = label.itemUniqueCount ? (label.itemUniqueCount += 1) : 1;
            label.itemTotalCount = label.itemTotalCount
              ? label.itemTotalCount + item.quantity
              : item.quantity;
          }
        });
      });

      labels.forEach((label) => {
        if (!label.itemTotalCount) label.itemTotalCount = 0;
        if (!label.itemUniqueCount) label.itemUniqueCount = 0;
        state.push(label);
      });
    },
    decrementItemCount: (
      state,
      action: PayloadAction<{ itemQuantity: number; labelId: string }>
    ) => {
      const index = state.findIndex((label) => label.id === action.payload.labelId);
      const itemUniqueCount = state[index].itemUniqueCount;
      const itemTotalCount = state[index].itemTotalCount;

      if (itemUniqueCount && itemTotalCount) {
        state[index].itemUniqueCount = itemUniqueCount - 1;
        state[index].itemTotalCount = itemTotalCount - action.payload.itemQuantity;
      } else {
        throw new Error(
          'decrementItemCount: attempting to decrement item counts' +
            `for label ${action.payload.labelId} that has no items`
        );
      }
    },
    incrementItemCount: (
      state,
      action: PayloadAction<{ itemQuantity: number; labelId: string }>
    ) => {
      const itemQuantity = action.payload.itemQuantity;
      const index = state.findIndex((label) => label.id === action.payload.labelId);
      const itemUniqueCount = state[index].itemUniqueCount;
      const itemTotalCount = state[index].itemTotalCount;

      state[index].itemUniqueCount = itemUniqueCount ? itemUniqueCount + 1 : 1;
      state[index].itemTotalCount = itemTotalCount ? itemTotalCount + itemQuantity : itemQuantity;
    },

    resetLabelsState: () => initialState,
    // Allows to save existing sort order of labels on LabelsPage.
    // This order is used in sortLabelsBy(lastSortOrder) of slices/labelsFilters.
    // sortLabelsBy(lastSortOrder) prevents re-sorting the list of labels by name after edit.
    // This is needed to prevent labels jumping around if name change affects name sort order.
    saveSortOrder: (state, action: PayloadAction<Label[]>) => {
      action.payload.forEach((filteredLabel, filteredIndex) => {
        const index = state.findIndex((label) => label.id === filteredLabel.id);
        state[index].lastSortIndex = filteredIndex;
      });
    },
  },
});

export const {
  addLabels,
  incrementItemCount,
  decrementItemCount,
  resetLabelsState,
  saveSortOrder,
} = labelsSlice.actions;
export const labelsReducer = labelsSlice.reducer;
