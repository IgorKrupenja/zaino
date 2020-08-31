import React, { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Item from '../../../common/types/Item';
import selectFilteredInventoryItems from '../../state/selectors/items';
import { selectInventoryItemsStats } from '../../state/selectors/itemsStats';
import { RootState } from '../../state/store';
import InventoryListItem from './InventoryListItem';
import List from './List';
import Stats from './Stats';

const Inventory = () => {
  // a bit of a hack: shallowEqual prevents re-renders when items in store do not change
  // (i.e. new filter conditions result in the same matching items)
  // https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
  const items = useSelector(
    (state: RootState) => selectFilteredInventoryItems(state),
    shallowEqual
  );
  const itemStats = useSelector(
    (state: RootState) => selectInventoryItemsStats(state),
    shallowEqual
  );

  return (
    <section className="inventory">
      <h2>Inventory</h2>
      <div>
        <Link to="/dashboard/add">Add item</Link>
      </div>
      <Stats
        weight={itemStats.weight}
        percentageOfTotal={itemStats.percentageOfTotal}
        filteredItemCount={itemStats.filteredItemCount}
        totalItemCount={itemStats.allItemCount}
      />
      <List
        title="inventory"
        filteredItemCount={itemStats.filteredItemCount}
        totalItemCount={itemStats.allItemCount}
      >
        {/* useMemo to prevent re-rendering when only location changes (i.e. on opening modal)
            - improves performance when opening/closing modals
            - preserves list scroll position when opening/closing modals
        */}
        {useMemo(() => items.map((item: Item) => <InventoryListItem key={item.id} {...item} />), [
          items,
        ])}
      </List>
    </section>
  );
};

export default Inventory;
