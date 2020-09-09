import React, { useCallback, useEffect, useRef, useState } from 'react';
import { OptionTypeBase, ValueType } from 'react-select';
import Categories from '../../../constants/Categories';
import useToggle from '../../../hooks/useToggle';
import { Popover } from '../../misc/Popover';
import { Select } from '../Select';

type CategorySelectProps = {
  selectedCategoryName: string | undefined;
  onChange: (categoryName: string) => void;
};

export const CategorySelect = ({ selectedCategoryName, onChange }: CategorySelectProps) => {
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
    togglePopover();
    onChange((newValue as OptionTypeBase)?.label);
  };

  // display filtered category when set by clicking on label/category inside ItemDetails
  useEffect(() => setValue(prepareValue(selectedCategoryName)), [
    selectedCategoryName,
    prepareValue,
  ]);

  const [isPopoverOpen, togglePopover] = useToggle();

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClickOutside={togglePopover}
      content={
        <>
          <h3>Filter by category</h3>
          <button type="button" onClick={togglePopover}>
            X
          </button>
          <Select
            value={value}
            // todo not decided yet
            // isSearchable={false}
            name="categoryName"
            components={{ IndicatorSeparator: null }}
            options={options}
            onChange={handleChange}
            placeholder="Search"
          />
        </>
      }
    >
      <button type="button" onClick={togglePopover}>
        Categories
      </button>
    </Popover>
  );
};
