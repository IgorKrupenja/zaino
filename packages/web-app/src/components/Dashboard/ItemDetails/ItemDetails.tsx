import { Item } from '@zaino/shared/';
import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryIcon from '../../../images/icons/category.svg';
import { setItemCategoryFilter } from '../../../state/slices/itemsFilters';
import { LabelBadgeList } from '../../Labels/LabelBadgeList';
import { CategoryImage } from '../../misc/CategoryImage';
import { RowWrapper } from '../../misc/RowWrapper';
import './style.scss';

type ItemDetailsProps = {
  item: Item;
  quantity?: ReactNode;
  children?: ReactNode;
};

export const ItemDetails = ({ item, quantity, children }: ItemDetailsProps) => {
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
        <RowWrapper>
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
        </RowWrapper>
        <LabelBadgeList className="label-badge-list--margin" labelIds={labelIds} />
        {children}
      </div>
      <CategoryImage categoryName={categoryName} />
    </article>
  );
};
