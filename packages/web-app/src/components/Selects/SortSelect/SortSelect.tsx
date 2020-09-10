import React, { useState } from 'react';
import { OptionTypeBase, ValueType } from 'react-select';
import useToggle from '../../../hooks/useToggle';
import { ItemSortOption } from '../../../state/slices/itemsFilters';
import { LabelSortOption } from '../../../state/slices/labelsFilters';
import { CloseButton } from '../../misc/CloseButton';
import { Popover } from '../../misc/Popover';
import { PopoverHeading } from '../../misc/PopoverHeading';
import { Select } from '../Select';

type SortSelectProps = {
  sortOptions: typeof LabelSortOption | typeof ItemSortOption;
  selectedOption: LabelSortOption | ItemSortOption;
  hiddenOption?: LabelSortOption | ItemSortOption;
  onChange: (sortBy: string) => void;
};

export const SortSelect = ({
  sortOptions,
  onChange,
  selectedOption,
  hiddenOption,
}: SortSelectProps) => {
  const options = Object.entries(sortOptions)
    .map(([key, value]: [string, string]) => ({
      value: key,
      label: value,
    }))
    .filter(option => option.label !== hiddenOption);
  const [value, setValue] = useState<ValueType<OptionTypeBase>>(
    options.find(option => option.label === selectedOption)
  );
  const handleChange = (newValue: ValueType<OptionTypeBase>) => {
    togglePopover();
    setValue(newValue);
    onChange((newValue as OptionTypeBase).label);
  };

  const [isPopoverOpen, togglePopover] = useToggle();

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClickOutside={togglePopover}
      content={
        <>
          <PopoverHeading text="Sort by">
            <CloseButton onClick={togglePopover} />
          </PopoverHeading>
          <Select
            value={value}
            name="sortBy"
            options={options}
            onChange={handleChange}
            components={{
              Control: () => null,
            }}
          />
        </>
      }
    >
      <button type="button" onClick={togglePopover}>
        Sort
      </button>
    </Popover>
  );
};
