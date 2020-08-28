import { createSelector } from '@reduxjs/toolkit';
import { Item } from '../../types/Item';
import selectFilteredInventoryItems, {
  selectAllInventoryItems,
  selectAllPackItems,
  selectFilteredPackItems,
} from './items';

const getWeight = (items: Item[], isPack?: boolean) => {
  return items.reduce((sum, item) => {
    const quantity = isPack ? item.packQuantity : item.quantity;
    // take into account items that have no weight
    return item.weight ? sum + item.weight * quantity : sum;
  }, 0);
};

const getItemCount = (items: Item[], isPack?: boolean) => {
  return items.reduce((sum, item) => {
    return sum + (isPack ? item.packQuantity : item.quantity);
  }, 0);
};

const getItemStats = (filteredItems: Item[], allItems: Item[], isPack?: boolean) => {
  const weight = getWeight(filteredItems, isPack);
  // + below drops any "extra" zeroes at the end
  // It changes the result (which is a string) into a number again (e.g. "0 + foo"),
  // which means that it uses only as many digits as necessary
  const percentageOfTotal = +((weight * 100) / getWeight(allItems, isPack)).toFixed(2);
  const allItemCount = getItemCount(allItems, isPack);
  const filteredItemCount = getItemCount(filteredItems, isPack);
  return { weight, percentageOfTotal, allItemCount, filteredItemCount };
};

export const selectInventoryItemsStats = createSelector(
  [selectFilteredInventoryItems, selectAllInventoryItems],
  (filteredItems, allItems) => getItemStats(filteredItems, allItems)
);

export const selectPackItemsStats = createSelector(
  [selectFilteredPackItems, selectAllPackItems],
  (filteredItems, allItems) => getItemStats(filteredItems, allItems, true)
);
