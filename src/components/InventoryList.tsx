import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import List from './List';
import InventoryListItem from './InventoryListItem';
import { Item } from '../types/types';
import { RootState } from '../store/store';

const InventoryList = () => (
  <List
    items={useSelector((state: RootState) => state.items).map((item: Item) => (
      <InventoryListItem key={item.id} {...item} />
    ))}
    title="inventory"
  >
    <Link to="/add">Add item</Link>
  </List>
);

export default InventoryList;
