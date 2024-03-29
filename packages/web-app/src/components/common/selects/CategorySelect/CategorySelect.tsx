import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { OnChangeValue } from 'react-select';
import { PopoverAlign } from 'react-tiny-popover';

import { RootState } from '../../../../state/types';
import { SelectOption } from '../../../../types';
import { sortSelectOptionsByName } from '../../../../utils';
import { SelectPopover } from '../SelectPopover';
import { categorySelectStyle } from './CategorySelect.style';

type CategorySelectProps = {
  children: ReactNode;
  headerText: string;
  onChange: (categoryName: string) => void;
  popoverAlign?: PopoverAlign;
  selectedCategoryId?: string;
};

export const CategorySelect = ({
  selectedCategoryId,
  onChange,
  children,
  ...rest
}: CategorySelectProps) => {
  const categories = useSelector((state: RootState) => state.categories);
  const [options] = useState(
    categories
      .map((category) => ({
        label: category.name,
        value: category.id,
      }))
      .sort(sortSelectOptionsByName)
  );

  const prepareValue = useCallback(
    (selectedCategoryName: string | undefined) => {
      return options.find((option) => option.value === selectedCategoryName);
    },
    [options]
  );
  const [value, setValue] = useState(prepareValue(selectedCategoryId));

  const handleChange = (newValue: OnChangeValue<SelectOption, boolean>) => {
    onChange((newValue as SelectOption)?.value);
  };

  // Update selected category when clicking on a category inside ItemDetails
  useEffect(() => setValue(prepareValue(selectedCategoryId)), [selectedCategoryId, prepareValue]);

  return (
    <SelectPopover
      name="categoryName"
      noOptionsMessage={() => 'No matching categories'}
      onChange={handleChange}
      options={options}
      styles={categorySelectStyle}
      value={value}
      {...rest}
    >
      {children}
    </SelectPopover>
  );
};
