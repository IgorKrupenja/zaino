import { Item } from '@zaino/shared/';
import React, { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import selectFilteredInventoryItems from '../../state/selectors/items';
import { selectInventoryItemsStats } from '../../state/selectors/itemsStats';
import { RootState } from '../../state/store';
import { Button } from '../misc/Button';
import { InventoryItem } from './InventoryItem';
import { List } from './List';
import { Stats } from './Stats';

const Inventory = () => {
  // a bit of a hack: shallowEqual prevents re-renders when items in store do not change
  // (i.e. new filter conditions result in the same matching items)
  // https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
  const items = useSelector(
    (state: RootState) => selectFilteredInventoryItems(state),
    shallowEqual
  );
  const stats = useSelector((state: RootState) => selectInventoryItemsStats(state), shallowEqual);

  return (
    <>
      <h2>Inventory</h2>
      <Button>
        {/* todo link likely needs 100% w/h */}
        <Link to="/dashboard/add">Add item</Link>
      </Button>
      <Stats stats={stats} />
      <List
        title="inventory"
        filteredItemCount={items.length}
        allItemCount={stats.allItemUniqueCount}
      >
        {/* useMemo to prevent re-rendering when only location changes (i.e. on opening modal)
            - improves performance when opening/closing modals
            - preserves list scroll position when opening/closing modals
        */}
        {useMemo(() => items.map((item: Item) => <InventoryItem key={item.id} {...item} />), [
          items,
        ])}
      </List>
    </>
  );
};

export default Inventory;
