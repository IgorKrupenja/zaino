import React from 'react';
import { useDispatch } from 'react-redux';
import { updateItem } from '../../slices/items';
import { Item } from '../../types/items';
import ListItemDetails from './ListItemDetails';

const InventoryListItem = (item: Item) => {
  const dispatch = useDispatch();
  return (
    <ListItemDetails
      item={item}
      quantityElement={item.quantity > 1 && `Qty: ${item.quantity}`}
      button={
        item.packQuantity < 1 ? (
          <button onClick={() => dispatch(updateItem({ ...item, id: item.id, packQuantity: 1 }))}>
            Add to pack
          </button>
        ) : (
          <button>Already in pack</button>
        )
      }
    />
  );
};

export default InventoryListItem;
