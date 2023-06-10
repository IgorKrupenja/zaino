import './ItemDetails.scss';

import { Item } from '@zaino/shared';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as CategoryIcon } from '../../../images/icons/category.svg';
import { BulletRow } from '../../common/containers/BulletRow';
import { Category } from '../../common/misc/Category';
import { CategoryImage } from '../../common/misc/CategoryImage';
import { Corkscrew } from '../../common/misc/Corkscrew';
import { LabelBadgeList } from '../../common/misc/LabelBadgeList';

type ItemDetailsProps = {
  children?: ReactNode;
  item: Item;
  quantity?: ReactNode;
};

export const ItemDetails = ({ item, quantity, children }: ItemDetailsProps) => {
  const { id, name, categoryId, labelIds, weight } = item;

  return (
    <article className="item-details">
      <CategoryImage categoryId={categoryId} className="item-details__category-image" />
      <h3 className="item-details--image-margin">
        <Link className="item-details__name" to={`/dashboard/edit/${id}`}>
          {name === 'CORKSCREW' ? <Corkscrew /> : name}
        </Link>
      </h3>
      <BulletRow className="item-details--image-margin">
        <Category categoryId={categoryId} className="item-details__category">
          <div className="item-details__category-icon__container">
            <CategoryIcon className="item-details__category-icon" />
          </div>
        </Category>
        {/* show weight if user has set it (including to 0), hide if not set */}
        {weight !== '' ? <span className="item-details__weight">{`${weight}g`}</span> : ''}
        {quantity}
      </BulletRow>
      <LabelBadgeList className="item-details__label-list" labelIds={labelIds} />
      {children}
    </article>
  );
};
