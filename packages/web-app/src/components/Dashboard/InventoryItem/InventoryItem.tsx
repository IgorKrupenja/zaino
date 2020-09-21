import { Item } from '@zaino/shared/';
import React from 'react';
import { useDispatch } from 'react-redux';
import BackpackIcon from '../../../images/icons/backpack.svg';
import { updateItem } from '../../../state/slices/items';
import { Button } from '../../misc/Button';
import { ItemDetails } from '../ItemDetails/';
import './style.scss';

export const InventoryItem = (item: Item) => {
  const dispatch = useDispatch();

  const isInPack = item.packQuantity > 0;

  return (
    <ItemDetails
      item={item}
      quantity={
        item.quantity > 1 && (
          <span className="item-details__quantity"> • Quantity: {item.quantity}</span>
        )
      }
    >
      <Button
        className="button--grey button--small"
        disabled={isInPack}
        onClick={() => dispatch(updateItem({ ...item, id: item.id, packQuantity: 1 }))}
      >
        <BackpackIcon
          className={`button--grey__icon${isInPack ? ' button--grey__icon--disabled' : ''}`}
        />
        {isInPack ? 'Already in pack' : 'Add to pack'}
      </Button>
    </ItemDetails>
  );
};
