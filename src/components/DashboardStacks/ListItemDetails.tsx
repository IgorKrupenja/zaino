import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { categories } from '../../constants/categories';
import { RootState } from '../../state/store';
import { Item } from '../../types/Item';

type ListItemProps = {
  item: Item;
  quantityElement?: React.ReactNode;
  button?: React.ReactNode;
};

const ListItemDetails = ({ item, quantityElement, button }: ListItemProps) => {
  const { id, name, categoryName: category, labelIds: labels, weight } = item;
  return (
    <article>
      <h3>
        <Link to={{ pathname: `/dashboard/edit/${id}`, state: { item } }}>{name}</Link>
      </h3>
      <img
        src={`../../images/categories/${categories.find(cat => cat.name === category)?.imagePath}`}
        className="list-item__image"
      />
      <p>{category}</p>
      <p>
        {weight}g {quantityElement}
      </p>
      <ul>
        {/* todo is this slow? see #113 */}
        {/* note that reduce is faster than filter + map as it traverses the array only once*/}
        {/* get all labels from store with all the needed details (id's in addition to names) */}
        {useSelector((state: RootState) => state.labels).reduce(
          // get only selected labels for a particular item
          (accumulator: React.ReactChild[], currentLabel) => {
            if (labels?.includes(currentLabel.id)) {
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

export default ListItemDetails;
