import { createSelector } from '@reduxjs/toolkit';
import { Item } from '../types/items';
import selectFilteredInventoryItems, {
  selectAllInventoryItems,
  selectAllPackItems,
  selectFilteredPackItems,
} from './items';

const getWeight = (items: Item[], isPack?: boolean) => {
  return items.reduce((sum, item) => {
    const quantity = isPack ? item.packQuantity : item.quantity;
    return sum + item.weight * quantity;
  }, 0);
};

const getItemStats = (filteredItems: Item[], allItems: Item[], isPack?: boolean) => {
  const weight = getWeight(filteredItems, isPack);
  // + below drops any "extra" zeroes at the end
  // It changes the result (which is a string) into a number again (e.g. "0 + foo"),
  // which means that it uses only as many digits as necessary
  const percentageOfTotal = +((weight * 100) / getWeight(allItems, isPack)).toFixed(2);
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
  [selectFilteredPackItems, selectAllPackItems],
  (filteredItems, allItems) => {
    return getItemStats(filteredItems, allItems, true);
  }
);
