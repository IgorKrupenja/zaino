import React, { useCallback, useEffect, useRef, useState } from 'react';
import { OptionTypeBase, ValueType } from 'react-select';
import Categories from '../../../constants/Categories';
import useToggle from '../../../hooks/useToggle';
import DropdownIcon from '../../../images/icons/drop-down.svg';
import { Button } from '../../misc/Button';
import { CloseButton } from '../../misc/CloseButton';
import { Popover } from '../../Popover/Popover';
import { PopoverHeader } from '../../Popover/PopoverHeader';
import { Select } from '../Select';

type CategorySelectProps = {
  selectedCategoryName: string | undefined;
  onChange: (categoryName: string) => void;
  headerText: string;
};

export const CategorySelect = ({
  selectedCategoryName,
  onChange,
  headerText,
}: CategorySelectProps) => {
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
          <PopoverHeader text={headerText}>
            <CloseButton onClick={togglePopover} />
          </PopoverHeader>
          <Select
            value={value}
            name="categoryName"
            options={options}
            onChange={handleChange}
            noOptionsMessage={() => 'No matching categories'}
          />
        </>
      }
    >
      <Button className="button--white" onClick={togglePopover}>
        Categories
        <DropdownIcon className="button--white__icon" />
      </Button>
    </Popover>
  );
};
