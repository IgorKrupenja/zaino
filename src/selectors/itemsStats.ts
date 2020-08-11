import { createSelector } from '@reduxjs/toolkit';
import selectFilteredInventoryItems, {
  selectFilteredPackItems,
  selectAllInventoryItems,
} from './items';
import { Item } from '../types/items';

const getItemStats = (filteredItems: Item[], allItems: Item[]) => {
  const getWeight = (items: Item[]) => items.reduce((sum, item) => sum + item.weight, 0);
  const weight = getWeight(filteredItems);
  // + below drops any "extra" zeroes at the end
  // It changes the result (which is a string) into a number again (e.g. "0 + foo"),
  // which means that it uses only as many digits as necessary
  const percentageOfTotal = +((weight * 100) / getWeight(allItems)).toFixed(2);
  const totalItemCount = allItems.length;
  return { weight, percentageOfTotal, totalItemCount };
};

export const selectInventoryItemsStats = createSelector(
  [selectFilteredInventoryItems, selectAllInventoryItems],
  (filteredItems, allItems) => {
    return getItemStats(filteredItems, allItems);
  }
);

export const selectPackItemsStats = createSelector(
  [selectFilteredPackItems, selectAllInventoryItems],
  (filteredItems, allItems) => {
    return getItemStats(filteredItems, allItems);
  }
);
