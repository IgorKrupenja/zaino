import React, { useMemo, useEffect, ReactChild } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import selectItems from '../selectors/items';
import { RootState } from '../store/store';
import { Item } from '../types/types';
import InventoryListItem from './InventoryListItem';
import List from './List';

const InventoryList = () => {
  return (
    <List
      // a bit of a hack: shallowEqual prevents re-renders when items do not change
      // (i.e. new filter conditions result in the same matching items)
      // https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
      items={useSelector((state: RootState) => selectItems(state), shallowEqual).map(
        (item: Item) => (
          <InventoryListItem key={item.id} {...item} />
        )
      )}
      title="inventory"
    >
      <Link to="/add">Add item</Link>
    </List>
  );
};

export default InventoryList;
