import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import List from './List';
import PackListItem from './PackListItem';
import { Item } from '../types/types';
import { RootState } from '../store/store';
import { selectPackItems } from '../selectors/items';

const PackList = () => (
  <List
    items={useSelector((state: RootState) => selectPackItems(state), shallowEqual).map(
      (item: Item) => (
        <PackListItem key={item.id} {...item} />
      )
    )}
    title="pack"
  />
);

export default PackList;
