import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItemCategoryFilter } from '../../../../state/slices/itemsFilters';
import { RootState } from '../../../../state/store';
import { getClassString } from '../../../../utils';
import './style.scss';

type CategoryProps = {
  categoryId?: string;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

export const Category = ({ categoryId, className, onClick, children }: CategoryProps) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);
  const categoryName = categories.find((category) => category.id === categoryId)?.name;

  return (
    <div
      onClick={() => {
        dispatch(setItemCategoryFilter(categoryId));
        onClick && onClick();
      }}
      className={getClassString('category', className)}
    >
      {children}
      {categoryName ?? 'No category'}
    </div>
  );
};
