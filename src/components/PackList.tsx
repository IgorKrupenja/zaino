import React from 'react';
import { useSelector } from 'react-redux';
import List from './List';
import PackListItem from './PackListItem';
import { Item } from '../types/types';
import { RootState } from '../store/store';

const PackList = () => (
  <List
    // reduce is more efficient than .filter() + .map() as it traverses the array only once
    items={useSelector((state: RootState) => state.items).reduce(
      (accumulator: React.ReactChild[], currentItem: Item) => {
        if (currentItem.packQuantity && currentItem.packQuantity > 0) {
          accumulator.push(<PackListItem key={currentItem.id} {...currentItem} />);
        }
        return accumulator;
      },
      []
    )}
    title="pack"
  />
);

export default PackList;
