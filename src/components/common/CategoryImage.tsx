import React from 'react';
import Categories from '../../constants/Categories';

type CategoryImageProps = {
  categoryName: string;
};

const CategoryImage = ({ categoryName }: CategoryImageProps) => {
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

export default CategoryImage;
