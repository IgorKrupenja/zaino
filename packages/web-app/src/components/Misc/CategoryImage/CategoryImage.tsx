import React from 'react';
import Categories from '../../../constants/Categories';
import { getClassString } from '../../../utils/getClassString';
import './style.scss';

type CategoryImageProps = {
  categoryName: string;
  className?: string;
};

export const CategoryImage = ({ categoryName: categoryName, className }: CategoryImageProps) => {
  const imageFileName = Categories.find(category => {
    return category.name === categoryName;
  })?.imageFileName as string;

  return (
    <img
      src={`${process.env.GCP_STORAGE_URL as string}/categories/${imageFileName}`}
      className={`category-image${getClassString(className)}`}
    />
  );
};
