import React from 'react';
import { Button } from '../../Controls/Button';
import { EditIcon } from '../../Icons/EditIcon';
import { CategoryImage } from '../../Misc/CategoryImage';
import { CategorySelect } from '../../Selects/CategorySelect';
import { ColumnWrapper } from '../../Wrappers/ColumnWrapper';
import { RowWrapper } from '../../Wrappers/RowWrapper';
import './style.scss';

type CategoryPickerProps = {
  categoryName: string;
  onChange: (categoryName: string) => void;
};

/**
 * Category picker with Select, CategoryImage etc.
 * Extracted into a separate component to make ItemForm more readable.
 * Can possibly used elsewhere in the future?
 */
export const CategoryPicker = ({ categoryName, onChange }: CategoryPickerProps) => {
  return (
    <ColumnWrapper className="category-picker">
      {/* Select */}
      <CategorySelect
        popoverAlign="center"
        selectedCategoryName={categoryName}
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
        <CategoryImage categoryName={categoryName} />
        {/* Category name */}
        <div className="category-picker__name">{categoryName}</div>
      </RowWrapper>
    </ColumnWrapper>
  );
};
