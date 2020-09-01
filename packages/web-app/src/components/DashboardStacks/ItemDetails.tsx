import { Item } from '@zaino/shared/';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../state/store';
import CategoryImage from '../common/CategoryImage';

type ListItemProps = {
  item: Item;
  quantityElement?: React.ReactNode;
  button?: React.ReactNode;
};

const ItemDetails = ({ item, quantityElement, button }: ListItemProps) => {
  const { id, name, categoryName, labelIds, weight } = item;
  return (
    <article>
      <h3>
        <Link to={{ pathname: `/dashboard/edit/${id}`, state: { item } }}>{name}</Link>
      </h3>
      <CategoryImage categoryName={categoryName} />
      <p>{categoryName}</p>
      <p>
        {weight ? `${weight}g` : ''} {quantityElement}
      </p>
      <ul>
        {/* todo is this slow? see #113 */}
        {/* note that reduce is faster than filter + map as it traverses the array only once*/}
        {/* get all labels from store with all the needed details (id's in addition to names) */}
        {useSelector((state: RootState) => state.labels).reduce(
          // get only selected labels for a particular item
          (accumulator: React.ReactChild[], currentLabel) => {
            if (labelIds?.includes(currentLabel.id)) {
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

export default ItemDetails;
