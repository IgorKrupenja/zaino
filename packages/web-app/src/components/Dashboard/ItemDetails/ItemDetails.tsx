import { Item } from '@zaino/shared/';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryIcon from '../../../images/icons/category.svg';
import { setItemCategoryFilter } from '../../../state/slices/itemsFilters';
import { LabelList } from '../../Labels/LabelList';
import { CategoryImage } from '../../misc/CategoryImage';
import './style.scss';

type ListItemProps = {
  item: Item;
  quantity?: React.ReactNode;
  children?: React.ReactNode;
};

export const ItemDetails = ({ item, quantity: quantity, children }: ListItemProps) => {
  const dispatch = useDispatch();
  const { id, name, categoryName, labelIds, weight } = item;

  return (
    <article className="item-details">
      {/* some extra divs here for proper positioning and styling with CSS */}
      <div>
        <h3>
          <Link
            className="item-details__name"
            to={{ pathname: `/dashboard/edit/${id}`, state: { item } }}
          >
            {name}
          </Link>
        </h3>
        <div className="item-details__horizontal-container">
          {/* todo breaks on small widths */}
          <span
            className="item-details__category"
            onClick={() => dispatch(setItemCategoryFilter(categoryName))}
          >
            <CategoryIcon className="item-details__category-icon" />
            {categoryName}
          </span>
          <span className="item-details__weight">{weight ? `• ${weight}g` : ''}</span>
          {quantity}
        </div>
        <LabelList labelIds={labelIds} />
        {children}
      </div>
      <CategoryImage categoryName={categoryName} />
    </article>
  );
};
