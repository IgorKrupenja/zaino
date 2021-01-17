import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { ValueType } from 'react-select';
import { Align } from 'react-tiny-popover';
import Categories from '../../../constants/Categories';
import { sortSelectOptionsByName } from '../../../utils/sortSelectOptionsByName';
import { SelectOption, SelectPopover } from '../SelectPopover';
import { categorySelectStyles } from './style';

type CategorySelectProps = {
  selectedCategoryName: string | undefined;
  onChange: (categoryName: string) => void;
  headerText: string;
  children: ReactNode;
  popoverAlign?: Align;
};

/**
 * Category select. Used in both ItemForm and DashboardFilters.
 */
export const CategorySelect = ({
  selectedCategoryName,
  onChange,
  children,
  ...rest
}: CategorySelectProps) => {
  const [options] = useState(
    Categories.map(category => ({
      value: category.name,
      label: category.name,
    })).sort(sortSelectOptionsByName)
  );
  // logic similar to LabelSelect
  const prepareValue = useCallback(
    (selectedCategoryName: string | undefined) => {
      return options.find(option => option.label === selectedCategoryName);
    },
    [options]
  );
  const [value, setValue] = useState(prepareValue(selectedCategoryName));

  const handleChange = (newValue: ValueType<SelectOption, boolean>) => {
    const selectedOption = newValue as SelectOption;
    onChange(selectedOption?.label);
  };

  // update selected category when clicking on a category inside ItemDetails
  useEffect(() => setValue(prepareValue(selectedCategoryName)), [
    selectedCategoryName,
    prepareValue,
  ]);

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
