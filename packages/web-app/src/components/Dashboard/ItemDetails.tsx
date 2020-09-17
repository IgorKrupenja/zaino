import { Item } from '@zaino/shared/';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setItemCategoryFilter, setItemLabelsFilter } from '../../state/slices/itemsFilters';
import { RootState } from '../../state/store';
import { CategoryImage } from '../misc/CategoryImage';

type ListItemProps = {
  item: Item;
  quantityElement?: React.ReactNode;
  button?: React.ReactNode;
};

const ItemDetails = ({ item, quantityElement, button }: ListItemProps) => {
  const dispatch = useDispatch();
  const { id, name, categoryName, labelIds, weight } = item;
  return (
    <article>
      <h3>
        <Link to={{ pathname: `/dashboard/edit/${id}`, state: { item } }}>{name}</Link>
      </h3>
      <CategoryImage categoryName={categoryName} />
      <p onClick={() => dispatch(setItemCategoryFilter(categoryName))}>{categoryName}</p>
      <p>
        {weight ? `${weight}g` : ''} {quantityElement}
      </p>
      <ul>
        {/* note that reduce is faster than filter + map as it traverses the array only once*/}
        {/* get all labels from store with all the needed details (id's in addition to names) */}
        {/* todo is this still slow though? see #113 */}
        {/* todo de-uglify */}
        {useSelector((state: RootState) => state.labels).reduce(
          // get only selected labels for a particular item
          (accumulator: React.ReactChild[], label) => {
            if (labelIds?.includes(label.id)) {
              accumulator.push(
                <li key={label.id} onClick={() => dispatch(setItemLabelsFilter([label.id]))}>
                  {label.name}
                </li>
              );
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
