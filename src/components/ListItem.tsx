import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Item, Label } from '../types/types';
import { RootState } from '../store/store';

type ListItemProps = {
  item: Item;
  quantityElement?: React.ReactNode;
  button?: React.ReactNode;
};

const ListItem = ({ item, quantityElement, button }: ListItemProps) => {
  const { id, name, category, labels, weight, size } = item;
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
        {weight}g {quantityElement} {size && `Size: ${size}`}
      </p>
      <ul>
        {/* get all labels from store with all the needed details (id's in addition to names) */}
        {useSelector((state: RootState) => state.labels).reduce(
          // get only selected labels for a particular item
          (accumulator: React.ReactChild[], currentLabel: Label) => {
            if (labels && labels.includes(currentLabel.id)) {
              accumulator.push(<li key={currentLabel.id}>{currentLabel.name}</li>);
            }
            return accumulator;
          },
          []
        )}
      </ul>
      {button}
    </article>
  );
};

export default ListItem;
