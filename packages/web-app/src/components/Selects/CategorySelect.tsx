import React, { useCallback, useEffect, useRef, useState } from 'react';
import Select, { OptionTypeBase, ValueType } from 'react-select';
import Categories from '../../constants/Categories';

type SortSelectProps = {
  selectedCategoryName: string | undefined;
  onChange: (categoryName: string) => void;
  isClearable?: boolean;
};

const CategorySelect = ({ selectedCategoryName, onChange, isClearable }: SortSelectProps) => {
  const options = useRef(
    Categories.map(category => ({
      value: category.name,
      label: category.name,
    }))
  ).current;
  // logic similar to LabelSelect
  const prepareValue = useCallback(
    (selectedCategoryName: string | undefined) => {
      return options.find(option => option.label === selectedCategoryName);
    },
    [options]
  );
  const [value, setValue] = useState(prepareValue(selectedCategoryName));
  const handleChange = (newValue: ValueType<OptionTypeBase>) => {
    onChange((newValue as OptionTypeBase)?.label);
  };

  // display filtered category when set by clicking on label/category inside ItemDetails
  useEffect(() => setValue(prepareValue(selectedCategoryName)), [
    selectedCategoryName,
    prepareValue,
  ]);

  return (
    <label>
      Category
      <Select
        className="single-select"
        value={value}
        isClearable={isClearable}
        // todo not decided yet
        // isSearchable={false}
        name="categoryName"
        options={options}
        onChange={handleChange}
      />
    </label>
  );
};

export default CategorySelect;
