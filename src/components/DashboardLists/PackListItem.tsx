import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateItem } from '../../slices/items';
import { Item } from '../../types/items';
import ListItemDetails from './ListItemDetails';

const PackListItem = (item: Item) => {
  const dispatch = useDispatch();
  const [packQuantity, setPackQuantity] = useState(item.packQuantity);

  const decreasePackQuantity = () => {
    setPackQuantity(packQuantity - 1);
    dispatch(updateItem({ ...item, packQuantity: packQuantity - 1 }));
  };
  const increasePackQuantity = () => {
    if (packQuantity < item.quantity) {
      setPackQuantity(packQuantity + 1);
      dispatch(updateItem({ ...item, packQuantity: packQuantity + 1 }));
    }
  };

  return (
    <ListItemDetails
      item={item}
      quantityElement={
        item.quantity > 1 && (
          <>
            In pack: <button onClick={decreasePackQuantity}>-</button>
            {packQuantity}
            <button onClick={increasePackQuantity}>+</button> of {item.quantity}
          </>
        )
      }
      button={
        packQuantity > 0 && (
          <button onClick={() => dispatch(updateItem({ ...item, id: item.id, packQuantity: 0 }))}>
            Remove from pack
          </button>
        )
      }
    />
  );
};

export default PackListItem;
