import { Category } from '@zaino/shared';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ValueType } from 'react-select';
import { Align } from 'react-tiny-popover';
import { RootState } from '../../../../state/store';
import { sortSelectOptionsByName } from '../../../../utils/sortSelectOptionsByName';
import { SelectOption, SelectPopover } from '../SelectPopover';
import { categorySelectStyles } from './style';

type CategorySelectProps = {
  selectedCategoryId?: string;
  onChange: (categoryName: string) => void;
  headerText: string;
  children: ReactNode;
  popoverAlign?: Align;
};

/**
 * Category select. Used in both ItemForm and DashboardFilters.
 */
export const CategorySelect = ({
  selectedCategoryId,
  onChange,
  children,
  ...rest
}: CategorySelectProps) => {
  const categories = useSelector((state: RootState) => state.categories);
  const [options] = useState(
    categories
      .map(category => ({
        value: category.id,
        label: category.name,
      }))
      .sort(sortSelectOptionsByName)
  );

  // logic similar to LabelSelect
  const prepareValue = useCallback(
    (selectedCategoryName: string | undefined) => {
      return options.find(option => option.label === selectedCategoryName);
    },
    [options]
  );
  const [value, setValue] = useState(prepareValue(selectedCategoryId));

  const handleChange = (newValue: ValueType<SelectOption, boolean>) => {
    const selectedOption = newValue as SelectOption;
    onChange(selectedOption?.value);
  };

  // update selected category when clicking on a category inside ItemDetails
  useEffect(() => setValue(prepareValue(selectedCategoryId)), [selectedCategoryId, prepareValue]);

  return (
    <SelectPopover
      value={value}
      styles={categorySelectStyles}
      name="categoryName"
      options={options}
      onChange={handleChange}
      noOptionsMessage={() => 'No matching categories'}
      {...rest}
    >
      {children}
    </SelectPopover>
  );
};
