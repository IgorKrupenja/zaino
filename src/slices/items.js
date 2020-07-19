import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

// todo check if all exports are used

export const itemsSlice = createSlice({
  name: 'items',
  initialState: [
    {
      id: '12334asd',
      name: 'Light backpack',
      category: 'Backpacks',
      tags: ['Male', 'Grey case'],
      weight: 380,
      size: 'M',
      quantity: 2,
    },
  ],
  reducers: {
    addItem: (state, action) => {
      console.log('reducing!');
      state.push({ id: uuid(), ...action.payload });
    },
  },
});

export const { addItem } = itemsSlice.actions;
export default itemsSlice.reducer;
