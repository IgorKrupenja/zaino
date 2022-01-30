import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, Item } from '@zaino/shared';

const initialState: Category[] = [];

const categoriesSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    loadCategories: (state, action: PayloadAction<{ categories: Category[]; items: Item[] }>) => {
      const categories = action.payload.categories;
      // compute item counts for each category as these are not stored in Firestore
      // these counts are used on CategoriesPage, including in sort
      action.payload.items.forEach((item) => {
        const category = categories.find((category) => category.id === item.categoryId);
        // only if category not empty
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
export default categoriesSlice.reducer;
