import React from 'react';
import { categories, CategoryName } from '../../constants/categories';

type CategoryImageProps = {
  categoryName: CategoryName;
};

const CategoryImage = ({ categoryName }: CategoryImageProps) => {
  const imageFileName = categories.find(category => {
    return category.name === categoryName;
  })?.imageFileName as string;

  return (
    <img
      src={`${process.env.GCP_STORAGE_URL as string}/categories/${imageFileName}`}
      className="category-image"
    />
  );
};

export default CategoryImage;
