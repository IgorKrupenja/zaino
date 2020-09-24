import { Item } from '@zaino/shared/';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import NoBackpackIcon from '../../../images/icons/no-backpack.svg';
import { updateItem } from '../../../state/slices/items';
import { Button } from '../../Controls/Button';
import { RowWrapper } from '../../Misc/RowWrapper';
import { ItemDetails } from '../ItemDetails/';

export const PackItem = (item: Item) => {
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
    <ItemDetails item={item}>
      {item.quantity > 1 && (
        <RowWrapper>
          Quantity in pack:
          <Button className="button--grey button--extra-small" onClick={decreasePackQuantity}>
            -
          </Button>
          <span className="item-details__pack-quantity">{packQuantity}</span>
          <Button
            disabled={item.quantity === item.packQuantity}
            className={'button--grey button--extra-small'}
            onClick={increasePackQuantity}
          >
            +
          </Button>
        </RowWrapper>
      )}
      <Button
        className="button--grey button--small button--red-text"
        onClick={() => dispatch(updateItem({ ...item, id: item.id, packQuantity: 0 }))}
      >
        <NoBackpackIcon className="button--grey__icon button__icon--test" />
        Remove from pack
      </Button>
    </ItemDetails>
  );
};
