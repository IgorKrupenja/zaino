import React, { useState } from 'react';
import Select, { OptionTypeBase, ValueType } from 'react-select';
import { ItemSortOption } from '../../state/slices/itemsFilters';
import { LabelSortOption } from '../../state/slices/labelsFilters';

type SortSelectProps = {
  sortOptions: typeof LabelSortOption | typeof ItemSortOption;
  selectedOption: LabelSortOption | ItemSortOption;
  hiddenOption?: LabelSortOption | ItemSortOption;
  onChange: (sortBy: string) => void;
};

const SortSelect = ({ sortOptions, onChange, selectedOption, hiddenOption }: SortSelectProps) => {
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
    setValue(newValue);
    onChange((newValue as OptionTypeBase).label);
  };

  return (
    <label>
      Sort
      <Select
        defaultValue={value}
        isSearchable={false}
        name="sortBy"
        options={options}
        onChange={handleChange}
      />
    </label>
  );
};

export default SortSelect;
