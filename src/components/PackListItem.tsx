import React from 'react';
import { useDispatch } from 'react-redux';
import ListItem from './ListItem';
import { updateItem } from '../slices/items';
import { Item } from '../types/types';

const PackListItem = (item: Item) => {
  const dispatch = useDispatch();
  return (
    <ListItem item={item}>
      {item.quantityInPack > 0 && (
        <button onClick={() => dispatch(updateItem({ ...item, id: item.id, quantityInPack: 0 }))}>
          Remove from pack
        </button>
      )}
    </ListItem>
  );
};

export default PackListItem;
