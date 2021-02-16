import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { Button } from '../../Controls/Button';
import { EditIcon } from '../../Icons/EditIcon';
import { CategoryImage } from '../../Misc/CategoryImage';
import { CategorySelect } from '../../Selects/CategorySelect';
import { ColumnWrapper } from '../../Wrappers/ColumnWrapper';
import { RowWrapper } from '../../Wrappers/RowWrapper';
import './style.scss';

type CategoryPickerProps = {
  categoryId?: string;
  onChange: (categoryName: string) => void;
};

/**
 * Category picker with Select, CategoryImage etc.
 * Extracted into a separate component to make ItemForm more readable.
 * Can possibly used elsewhere in the future?
 */
export const CategoryPicker = ({ categoryId, onChange }: CategoryPickerProps) => {
  const categories = useSelector((state: RootState) => state.categories);
  const categoryName = categories.find(category => category.id === categoryId)?.name;

  return (
    <ColumnWrapper className="category-picker">
      {/* Select */}
      <CategorySelect
        popoverAlign="center"
        selectedCategoryId={categoryId}
        headerText="Select category"
        onChange={onChange}
      >
        <Button className="button--white button--small">
          Category
          <EditIcon />
        </Button>
      </CategorySelect>
      <RowWrapper>
        {/* Category image */}
        <CategoryImage categoryId={categoryId} />
        {/* Category name */}
        <div className="category-picker__name">{categoryName}</div>
      </RowWrapper>
    </ColumnWrapper>
  );
};
