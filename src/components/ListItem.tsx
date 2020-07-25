import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editItem } from '../slices/items';
import { Item, Label } from '../types/types';
import { RootState } from '../store/store';

type ListItemProps = {
  item: Item;
  children?: React.ReactNode;
};

const ListItem = ({ item, children }: ListItemProps) => {
  const { id, name, category, labels, weight, size, quantity } = item;
  return (
    <article>
      <h3>
        <Link to={{ pathname: `/edit/${id}`, state: { item } }}>{name}</Link>
      </h3>
      <img
        src={require(`../images/categories/${category.toLowerCase()}.svg`)}
        className="list-item__image"
      />
      <p>{category}</p>
      <p>
        {/* todo quantity elements need to be passed as props.quantitySomething */}
        {/* todo https://reactjs.org/docs/composition-vs-inheritance.html */}
        {weight}g {quantity > 1 && `Qty: ${quantity}`} {size && `Size: ${size}`}
      </p>
      <ul>
        {/* get all labels from store with all the needed details (id's in addition to names) */}
        {useSelector((state: RootState) => state.labels).reduce(
          // get only selected labels for a particular item
          (accumulator: React.ReactChild[], currentLabel: Label) => {
            if (labels.includes(currentLabel.id)) {
              accumulator.push(<li key={currentLabel.id}>{currentLabel.name}</li>);
            }
            return accumulator;
          },
          []
        )}
      </ul>
      {children}
    </article>
  );
};

export const InventoryListItem = (item: Item) => {
  const dispatch = useDispatch();
  return (
    <ListItem item={item}>
      {item.quantityInPack < 1 ? (
        <button onClick={() => dispatch(editItem({ ...item, id: item.id, quantityInPack: 1 }))}>
          Add to pack
        </button>
      ) : (
        <button>Already in pack</button>
      )}
    </ListItem>
  );
};

export const PackListItem = (item: Item) => {
  const dispatch = useDispatch();
  return (
    <ListItem item={item}>
      {item.quantityInPack > 0 && (
        <button onClick={() => dispatch(editItem({ ...item, id: item.id, quantityInPack: 0 }))}>
          Remove from pack
        </button>
      )}
    </ListItem>
  );
};
