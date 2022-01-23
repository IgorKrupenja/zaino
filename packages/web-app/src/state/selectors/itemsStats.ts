import { createSelector } from '@reduxjs/toolkit';
import { Item } from '@zaino/shared';
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

const getItemCounts = (items: Item[], isPack?: boolean) => {
  const itemCounts = {
    // unique item count, each item counts as one regardless of quantity
    unique: items.length,
    // total items count, taking quantity into consideration
    total: 0,
  };
  itemCounts.total = items.reduce((sum, item) => {
    return (sum += isPack ? item.packQuantity : item.quantity);
  }, 0);
  return itemCounts;
};

const getItemStats = (filteredItems: Item[], allItems: Item[], isPack?: boolean) => {
  const weight = getWeight(filteredItems, isPack);
  // + below drops any "extra" zeroes at the end
  // It changes the result (which is a string) into a number again (e.g. "0 + foo"),
  // which means that it uses only as many digits as necessary
  const percentage = +((weight * 100) / getWeight(allItems, isPack)).toFixed(2);
  const { total: filteredItemTotalCount, unique: filteredItemUniqueCount } = getItemCounts(
    filteredItems,
    isPack
  );
  return {
    weight,
    percentageOfTotal: isNaN(percentage) ? 0 : percentage,
    allItemUniqueCount: getItemCounts(allItems, isPack).unique,
    filteredItemTotalCount,
    filteredItemUniqueCount,
  };
};

export const selectInventoryItemsStats = createSelector(
  [selectFilteredInventoryItems, selectAllInventoryItems],
  (filteredItems, allItems) => getItemStats(filteredItems, allItems)
);

export const selectPackItemsStats = createSelector(
  [selectFilteredPackItems, selectAllPackItems],
  (filteredItems, allItems) => getItemStats(filteredItems, allItems, true)
);
