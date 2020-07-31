import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import List from './List';
import InventoryListItem from './InventoryListItem';
import { Item, Category } from '../types/types';
import { RootState } from '../store/store';
import selectItems from '../selectors/items';
import {
  setLabelsFilter,
  setTextFilter,
  setCategoryFilter,
  setSizeFilter,
} from '../slices/filters';

const InventoryList = () => {
  const dispatch = useDispatch();
  // dispatch(setLabelsFilter(['f0ab8ed6-2a70-4cfc-8a68-6a6c4f94ff55']));
  // dispatch(setTextFilter('blah'));
  // dispatch(setCategoryFilter(Category.tents));
  // dispatch(setSizeFilter('6'));

  return (
    <List
      items={useSelector((state: RootState) => selectItems(state)).map((item: Item) => (
        <InventoryListItem key={item.id} {...item} />
      ))}
      title="inventory"
    >
      <Link to="/add">Add item</Link>
    </List>
  );
};

export default InventoryList;
