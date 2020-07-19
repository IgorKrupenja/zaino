import React from 'react';
import { useSelector } from 'react-redux';
import InventoryListItem from './InventoryListItem';

const InventoryList = () => {
  const items = useSelector(state => state.items);
  return (
    <section>
      <h2>Inventory</h2>
      {items.length === 0 ? (
        <p>No items in inventory</p>
      ) : (
        items.map(item => <InventoryListItem key={item.id} {...item} />)
      )}
    </section>
  );
};

export default InventoryList;
