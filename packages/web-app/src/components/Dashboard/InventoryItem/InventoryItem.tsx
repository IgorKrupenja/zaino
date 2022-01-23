import React from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as BackpackIcon } from '../../../images/icons/backpack.svg';
import { Item } from '../../../shared';
import { updateItem } from '../../../state/slices/items';
import { Button } from '../../Common/Controls/Button';
import { ItemDetails } from '../ItemDetails/';
import './style.scss';

export const InventoryItem = (item: Item) => {
  const dispatch = useDispatch();

  const isInPack = item.packQuantity > 0;

  return (
    <ItemDetails item={item} quantity={item.quantity > 1 && <span>Quantity: {item.quantity}</span>}>
      <Button
        className="button--grey button--medium"
        disabled={isInPack}
        onClick={() => dispatch(updateItem({ ...item, id: item.id, packQuantity: 1 }))}
      >
        <BackpackIcon />
        {isInPack ? 'Already in pack' : 'Add to pack'}
      </Button>
    </ItemDetails>
  );
};
