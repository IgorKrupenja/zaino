import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import selectFilteredInventoryItems from '../../selectors/items';
import { selectInventoryItemsStats } from '../../selectors/itemsStats';
import { RootState } from '../../store/store';
import { Item } from '../../types/items';
import InventoryListItem from './InventoryListItem';
import List from './List';
import Stats from './Stats';

// todo perhaps rename to InventoryContainer
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
  const filteredItemCount = items.length;

  return (
    <section className="inventory">
      <h2>Inventory</h2>
      <Stats
        weight={itemStats.weight}
        percentageOfTotal={itemStats.percentageOfTotal}
        filteredItemCount={filteredItemCount}
        totalItemCount={itemStats.totalItemCount}
      />
      <List
        title="inventory"
        filteredItemCount={filteredItemCount}
        totalItemCount={itemStats.totalItemCount}
      >
        {items.map((item: Item) => (
          <InventoryListItem key={item.id} {...item} />
        ))}
      </List>
      <div>
        <Link to="/add">Add {filteredItemCount === 0 ? 'an' : 'another'} item</Link>
      </div>
    </section>
  );
};

export default Inventory;
