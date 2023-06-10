import './InventoryItem.scss';

import { Item } from '@zaino/shared';
import { useDispatch } from 'react-redux';

import { ReactComponent as BackpackIcon } from '../../../images/icons/backpack.svg';
import { updateItem } from '../../../state/slices/itemsSlice';
import { Button } from '../../common/controls/Button';
import { ItemDetails } from '../ItemDetails/';

export const InventoryItem = (item: Item) => {
  const dispatch = useDispatch();

  const isInPack = item.packQuantity > 0;

  return (
    <ItemDetails item={item} quantity={item.quantity > 1 && <span>Quantity: {item.quantity}</span>}>
      <Button
        disabled={isInPack}
        onClick={() => dispatch(updateItem({ ...item, id: item.id, packQuantity: 1 }))}
        size="medium"
        variant="tertiary"
      >
        <BackpackIcon
          className={`inventory-item__button-icon${
            isInPack ? ' inventory-item__button-icon__disabled' : ''
          }`}
        />
        {isInPack ? 'Already in pack' : 'Add to pack'}
      </Button>
    </ItemDetails>
  );
};
