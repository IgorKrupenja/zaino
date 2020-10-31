import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { setItemCategoryFilter } from '../../../state/slices/itemsFilters';
import { getClassString } from '../../../utils/getClassString';
import './style.scss';

type CategoryProps = {
  category: string;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

export const Category = ({ category, className, onClick, children }: CategoryProps) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(setItemCategoryFilter(category));
        onClick && onClick();
      }}
      className={getClassString('category', className)}
    >
      {children}
      {category}
    </div>
  );
};
