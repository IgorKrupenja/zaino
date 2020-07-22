import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
      <Link to="/add">Add item</Link>
    </section>
  );
};

export default InventoryList;
