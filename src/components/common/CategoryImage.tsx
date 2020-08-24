import React from 'react';
import { categories } from '../../constants/categories';

type CategoryImageProps = {
  categoryName: string;
};

const CategoryImage = ({ categoryName }: CategoryImageProps) => {
  return (
    <img
      src={`../../images/categories/${
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        categories.find(category => {
          return category.name === categoryName;
        })?.imagePath
      }`}
      className="list-item__image"
    />
  );
};

export default CategoryImage;
