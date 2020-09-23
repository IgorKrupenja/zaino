import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ValueType } from 'react-select';
import DropdownIcon from '../../../images/icons/drop-down.svg';
import { ItemSortOption } from '../../../state/slices/itemsFilters';
import { LabelSortOption } from '../../../state/slices/labelsFilters';
import { SelectOption } from '../../../types/SelectOption';
import { Button } from '../../misc/Button';
import { SelectPopover } from '../SelectPopover';
import styles from './style';

type SortSelectProps = {
  sortOptions: typeof LabelSortOption | typeof ItemSortOption;
  selectedOption: LabelSortOption | ItemSortOption;
  hiddenOption?: LabelSortOption | ItemSortOption;
  onChange: (sortBy: string) => void;
};

/**
 * Sort select. Used in both LabelFilters and DashboardFilters.
 */
export const SortSelect = ({
  sortOptions,
  onChange,
  selectedOption,
  hiddenOption,
}: SortSelectProps) => {
  const options = useRef(
    Object.entries(sortOptions)
      .map(([key, value]: [string, string]) => ({
        value: key,
        label: value,
      }))
      .filter(option => option.label !== hiddenOption)
  ).current;
  // logic similar to LabelSelect
  const prepareValue = useCallback(
    (selectedOption: string | undefined) => {
      return options.find(option => option.label === selectedOption);
    },
    [options]
  );
  const [value, setValue] = useState(prepareValue(selectedOption));

  // display proper sort options when sorting is reset in FilterReset
  useEffect(() => setValue(prepareValue(selectedOption)), [selectedOption, prepareValue]);

  const handleChange = (newValue: ValueType<SelectOption>) => {
    onChange((newValue as SelectOption).label);
  };

  return (
    <SelectPopover
      headerText="Sort by"
      value={value}
      name="sortBy"
      options={options}
      onChange={handleChange}
      components={{
        Control: () => null,
      }}
      styles={styles}
    >
      <Button className="button--white">
        Sort
        <DropdownIcon className="button--white__icon" />
      </Button>
    </SelectPopover>
  );
};
