import { Item } from '@zaino/shared/';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateItem } from '../../state/slices/items';
import ItemDetails from './ItemDetails';

const PackListItem = (item: Item) => {
  const dispatch = useDispatch();
  const [packQuantity, setPackQuantity] = useState(item.packQuantity);

  // update pack quantity on prop change
  // e.g. when lowering inventory quantity below current pack quantity in ItemForm
  useEffect(() => setPackQuantity(item.packQuantity), [item.packQuantity]);

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
    <ItemDetails
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
