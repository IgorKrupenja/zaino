import { Item } from '@zaino/shared';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CategoryIcon } from '../../../images/icons/category.svg';
import { LabelBadgeList } from '../../Common/labels/LabelBadgeList';
import { Category } from '../../Common/Misc/Category';
import { CategoryImage } from '../../Common/Misc/CategoryImage';
import { Corkscrew } from '../../Common/Misc/Corkscrew';
import { BulletRow } from '../../Common/Wrappers/BulletRow';
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
