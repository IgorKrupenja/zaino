import React from 'react';
import { useDispatch } from 'react-redux';
import { updateItem } from '../slices/items';
import { Item } from '../types/types';
import ListItem from './ListItem';

const InventoryListItem = (item: Item) => {
  const dispatch = useDispatch();
  return (
    <ListItem item={item}>
      {item.quantityInPack < 1 ? (
        <button onClick={() => dispatch(updateItem({ ...item, id: item.id, quantityInPack: 1 }))}>
          Add to pack
        </button>
      ) : (
        <button>Already in pack</button>
      )}
    </ListItem>
  );
};

export default InventoryListItem;
