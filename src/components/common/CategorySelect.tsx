import React from 'react';
import Select, { OptionTypeBase, ValueType } from 'react-select';
import Categories from '../../constants/categories';

type SortSelectProps = {
  selectedCategoryName: string | undefined;
  onChange: (categoryName: string) => void;
  isClearable?: boolean;
};

const CategorySelect = ({ selectedCategoryName, onChange, isClearable }: SortSelectProps) => {
  const options = Categories.map(category => ({
    value: category.name,
    label: category.name,
  }));
  const handleChange = (newValue: ValueType<OptionTypeBase>) => {
    onChange((newValue as OptionTypeBase)?.label);
  };

  return (
    <label>
      Category
      <Select
        className="single-select"
        defaultValue={options.find(options => options.label === selectedCategoryName)}
        isClearable={isClearable}
        isSearchable={false}
        name="categoryName"
        options={options}
        onChange={handleChange}
      />
    </label>
  );
};

export default CategorySelect;
