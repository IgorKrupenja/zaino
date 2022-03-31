import { Item } from '@zaino/shared';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as NoBackpackIcon } from '../../../images/icons/no-backpack.svg';
import { updateItem } from '../../../state/slices/itemsSlice';
import { Row } from '../../common/containers/Row';
import { Button } from '../../common/controls/Button';
import { ItemDetails } from '../ItemDetails';
import './style.scss';

export const PackItem = (item: Item) => {
  const dispatch = useDispatch();
  const [packQuantity, setPackQuantity] = useState(item.packQuantity);

  // Update pack quantity on prop change,
  // e.g. when lowering inventory quantity below current pack quantity in ItemForm.
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
        <Row>
          Quantity in pack:
          <Button
            className="button--tertiary pack-item__quantity--button"
            onClick={decreasePackQuantity}
          >
            -
          </Button>
          <span className="pack-item__quantity">{packQuantity}</span>
          <Button
            disabled={item.quantity === item.packQuantity}
            className="button--tertiary pack-item__quantity--button"
            onClick={increasePackQuantity}
          >
            +
          </Button>
        </Row>
      )}
      <Button
        className="button--tertiary button--medium pack-item__remove"
        onClick={() => dispatch(updateItem({ ...item, id: item.id, packQuantity: 0 }))}
      >
        <NoBackpackIcon className="pack-item__button-icon" />
        Remove from pack
      </Button>
    </ItemDetails>
  );
};
