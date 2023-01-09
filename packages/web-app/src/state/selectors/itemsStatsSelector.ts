import { createSelector } from '@reduxjs/toolkit';
import { Item } from '@zaino/shared';

import {
  selectAllInventoryItems,
  selectAllPackItems,
  selectFilteredInventoryItems,
  selectFilteredPackItems,
} from './itemsSelector';

export const selectInventoryItemsStats = createSelector(
  [selectFilteredInventoryItems, selectAllInventoryItems],
  (filteredItems, allItems) => getItemStats(filteredItems, allItems)
);

export const selectPackItemsStats = createSelector(
  [selectFilteredPackItems, selectAllPackItems],
  (filteredItems, allItems) => getItemStats(filteredItems, allItems, true)
);

const getItemStats = (filteredItems: Item[], allItems: Item[], isPack?: boolean) => {
  const weight = getWeight(filteredItems, isPack);
  const percentage = +((weight * 100) / getWeight(allItems, isPack)).toFixed(2);
  const { total: filteredItemTotalCount, unique: filteredItemUniqueCount } = getItemCounts(
    filteredItems,
    isPack
  );
  return {
    allItemUniqueCount: getItemCounts(allItems, isPack).unique,
    filteredItemTotalCount,
    filteredItemUniqueCount,
    percentageOfTotal: isNaN(percentage) ? 0 : percentage,
    weight,
  };
};

const getWeight = (items: Item[], isPack?: boolean) => {
  return items.reduce((sum, item) => {
    const quantity = isPack ? item.packQuantity : item.quantity;
    return item.weight ? sum + item.weight * quantity : sum;
  }, 0);
};

const getItemCounts = (items: Item[], isPack?: boolean) => {
  const itemCounts = {
    // Total items count, taking quantity into consideration
    total: 0,

    // Unique item count, each item counts as one regardless of quantity
    unique: items.length,
  };
  itemCounts.total = items.reduce((sum, item) => {
    return (sum += isPack ? item.packQuantity : item.quantity);
  }, 0);
  return itemCounts;
};
