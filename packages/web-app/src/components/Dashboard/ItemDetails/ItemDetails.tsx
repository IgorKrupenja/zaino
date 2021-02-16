import { Item } from '@zaino/shared/';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import CategoryIcon from '../../../images/icons/category.svg';
import { LabelBadgeList } from '../../LabelBadge/LabelBadgeList';
import { Category } from '../../Misc/Category';
import { CategoryImage } from '../../Misc/CategoryImage';
import { Corkscrew } from '../../Misc/Corkscrew';
import { BulletWrapper } from '../../Wrappers/BulletWrapper';
import './style.scss';

type ItemDetailsProps = {
  item: Item;
  quantity?: ReactNode;
  children?: ReactNode;
};

export const ItemDetails = ({ item, quantity, children }: ItemDetailsProps) => {
  const { id, name, categoryId, labelIds, weight } = item;

  return (
    <article className="item-details">
      <CategoryImage className="item-details__category-image" categoryId={categoryId} />
      <h3 className="item-details--image-margin">
        <Link className="item-details__name" to={`/dashboard/edit/${id}`}>
          {name === 'CORKSCREW' ? <Corkscrew /> : name}
        </Link>
      </h3>
      <BulletWrapper className="item-details--image-margin">
        <Category categoryId={categoryId} className="item-details__category">
          {/* extra div to properly align SVG icon */}
          <div className="item-details__category-icon__container">
            <CategoryIcon className="item-details__category-icon" />
          </div>
        </Category>
        {/* show weight if user has set it (including to 0), hide if not set */}
        {weight !== '' ? <span className="item-details__weight">{`${weight}g`}</span> : ''}
        {quantity}
      </BulletWrapper>
      <LabelBadgeList className="item-details__label-list" labelIds={labelIds} />
      {children}
    </article>
  );
};
