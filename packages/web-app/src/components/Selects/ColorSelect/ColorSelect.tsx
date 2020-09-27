import React, { useRef, useState } from 'react';
import { ValueType } from 'react-select';
import { ColorName, Colors } from '../../../constants/Colors';
import DropdownIcon from '../../../images/icons/drop-down.svg';
import { Button } from '../../Controls/Button';
import { SelectOption, SelectPopover } from '../SelectPopover';
import { colorSelectStyles } from './style';

type ColorSelectProps = {
  selectedColorName: ColorName;
  onChange: (colorName: ColorName) => void;
};

export const ColorSelect = ({ selectedColorName, onChange }: ColorSelectProps) => {
  const options = useRef(
    Colors.map(color => ({
      value: color.name,
      label: color.fancyName,
      hexValue: color.hexValue,
    }))
  ).current;
  const [value, setValue] = useState<ValueType<SelectOption>>(
    options.find(color => color.value === selectedColorName)
  );

  const handleChange = (newValue: ValueType<SelectOption>) => {
    setValue(newValue);
    onChange((newValue as SelectOption)?.value as ColorName);
  };

  return (
    <SelectPopover
      headerText="Select color"
      value={value}
      name="categoryName"
      options={options}
      styles={colorSelectStyles}
      onChange={handleChange}
      components={{ IndicatorSeparator: null, Control: () => null }}
    >
      <Button className="button--white">
        Color
        <DropdownIcon className="button--white__icon" />
      </Button>
    </SelectPopover>
  );
};
