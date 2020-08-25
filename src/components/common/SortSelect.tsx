import React, { useState } from 'react';
import Select, { OptionTypeBase, ValueType } from 'react-select';
import { LabelSortOption } from '../../state/slices/labelsFilters';

export type SortSelectOption = {
  value: string;
  label: string;
} & OptionTypeBase;

type SortSelectProps = {
  onChange: (value: SortSelectOption) => void;
  sortBy: LabelSortOption;
};

const SortSelect = ({ onChange, sortBy }: SortSelectProps) => {
  const options = Object.entries(LabelSortOption)
    .map(([key, value]) => ({
      value: key,
      label: value,
    }))
    .filter(option => option.label !== LabelSortOption.lastSortOrder);
  const [value, setValue] = useState<ValueType<SortSelectOption>>(
    options.find(option => option.label === sortBy)
  );

  const handleChange = (newValue: ValueType<SortSelectOption>) => {
    setValue(newValue);
    onChange(newValue as SortSelectOption);
  };

  return (
    <Select
      defaultValue={value}
      isSearchable={false}
      name="sortBy"
      options={options}
      onChange={handleChange}
    />
  );
};

export default SortSelect;
