import React from 'react';
import Select from 'react-select';

type CategorySelectProps = {};

const CategorySelect = () => {
  const options = Object.entries(sortOptions).map(([key, value]: [string, string]) => ({
    value: key,
    label: value,
  }));
  return (
    <label>
      Category
      <Select />
    </label>
  );
};

export default CategorySelect;
