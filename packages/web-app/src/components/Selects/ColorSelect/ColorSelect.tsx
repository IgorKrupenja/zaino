import { ColorName, Colors } from '@zaino/shared';
import React, { useState } from 'react';
import { OptionTypeBase, ValueType } from 'react-select';
import useToggle from '../../../hooks/useToggle';
import { CloseButton } from '../../misc/CloseButton';
import { Popover } from '../../misc/Popover';
import { PopoverHeader } from '../../misc/PopoverHeader';
import { Select } from '../Select';
import styles from './style';

type ColorSelectProps = {
  selectedColorName: ColorName;
  onChange: (colorName: ColorName) => void;
};

export const ColorSelect = ({ selectedColorName, onChange }: ColorSelectProps) => {
  const options = Colors.map(color => ({
    value: color.name,
    label: color.fancyName,
    hexValue: color.hexValue,
  }));
  const [value, setValue] = useState<ValueType<OptionTypeBase>>(
    options.find(color => color.value === selectedColorName)
  );
  const handleChange = (newValue: ValueType<OptionTypeBase>) => {
    togglePopover();
    setValue(newValue);
    onChange((newValue as OptionTypeBase)?.value);
  };

  const [isPopoverOpen, togglePopover] = useToggle();

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClickOutside={togglePopover}
      content={
        <>
          <PopoverHeader text="Select color">
            <CloseButton onClick={togglePopover} />
          </PopoverHeader>
          <Select
            className="single-select"
            value={value}
            name="categoryName"
            options={options}
            styles={styles}
            onChange={handleChange}
            components={{ IndicatorSeparator: null, Control: () => null }}
          />
        </>
      }
    >
      <button type="button" onClick={togglePopover}>
        Color
      </button>
    </Popover>
  );
};
