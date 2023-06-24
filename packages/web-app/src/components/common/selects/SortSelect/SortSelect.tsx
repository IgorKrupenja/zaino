import { useCallback, useEffect, useRef, useState } from 'react';
import { OnChangeValue } from 'react-select';

import { CollectionSortOption, ItemSortOption } from '../../../../state/enums';
import { SelectOption } from '../../../../types';
import { Button } from '../../controls/Button';
import { DropdownIcon } from '../../icons/DropdownIcon';
import { SelectPopover } from '../SelectPopover';
import { sortSelectStyles } from './style';

type SortSelectProps = {
  sortOptions: typeof CollectionSortOption | typeof ItemSortOption;
  selectedOption: CollectionSortOption | ItemSortOption;
  hiddenOption?: CollectionSortOption | ItemSortOption;
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
        label: value,
        value: key,
      }))
      .filter((option) => option.label !== hiddenOption)
  ).current;
  // logic similar to LabelSelect
  const prepareValue = useCallback(
    (selectedOption: string | undefined) => {
      return options.find((option) => option.label === selectedOption);
    },
    [options]
  );
  const [value, setValue] = useState(prepareValue(selectedOption));

  // display proper sort options when sorting is reset in FilterReset
  useEffect(() => setValue(prepareValue(selectedOption)), [selectedOption, prepareValue]);

  const handleChange = (newValue: OnChangeValue<SelectOption, boolean>) => {
    onChange((newValue as SelectOption).label);
  };

  return (
    <SelectPopover
      components={{ Control: () => null }}
      headerText="Sort by"
      name="sortBy"
      onChange={handleChange}
      options={options}
      styles={sortSelectStyles}
      value={value}
    >
      <Button variant="transparent">
        Sort
        <DropdownIcon />
      </Button>
    </SelectPopover>
  );
};
