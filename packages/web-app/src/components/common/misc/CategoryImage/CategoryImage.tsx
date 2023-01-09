import './style.scss';

import { useSelector } from 'react-redux';

import { RootState } from '../../../../state/store';
import { getClassString } from '../../../../utils';

type CategoryImageProps = {
  categoryId?: string;
  className?: string;
};

export const CategoryImage = ({ categoryId, className }: CategoryImageProps) => {
  const categories = useSelector((state: RootState) => state.categories);
  const imageFileName = categories.find((category) => category.id === categoryId)
    ?.imageFileName as string;

  return categoryId ? (
    <img
      alt=""
      className={getClassString('category-image', { extraClassNames: className })}
      src={`${process.env.REACT_APP_GCP_STORAGE_URL as string}/categories/${imageFileName}`}
    />
  ) : (
    <></>
  );
};
