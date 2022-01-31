import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, Item } from '@zaino/shared';

const initialState: Category[] = [];

const categoriesSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    loadCategories: (state, action: PayloadAction<{ categories: Category[]; items: Item[] }>) => {
      const categories = action.payload.categories;
      action.payload.items.forEach((item) => {
        const category = categories.find((category) => category.id === item.categoryId);
        if (category) {
          category.itemUniqueCount = category.itemUniqueCount ? (category.itemUniqueCount += 1) : 1;
          category.itemTotalCount = category.itemTotalCount
            ? category.itemTotalCount + item.quantity
            : item.quantity;
        }
      });

      categories.forEach((category) => {
        if (!category.itemTotalCount) category.itemTotalCount = 0;
        if (!category.itemUniqueCount) category.itemUniqueCount = 0;
        state.push(category);
      });
    },
    resetCategoriesState: () => initialState,
  },
});

export const { resetCategoriesState, loadCategories } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
