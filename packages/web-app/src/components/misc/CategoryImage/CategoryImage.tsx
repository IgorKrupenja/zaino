import React from 'react';
import Categories from '../../../constants/Categories';
import './style.scss';

type CategoryImageProps = {
  categoryName: string;
};

export const CategoryImage = ({ categoryName }: CategoryImageProps) => {
  const imageFileName = Categories.find(category => {
    return category.name === categoryName;
  })?.imageFileName as string;

  return (
    <img
      src={`${process.env.GCP_STORAGE_URL as string}/categories/${imageFileName}`}
      className="category-image"
    />
  );
};
