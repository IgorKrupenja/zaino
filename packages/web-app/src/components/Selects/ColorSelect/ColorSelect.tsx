import React, { useRef, useState } from 'react';
import { ValueType } from 'react-select';
import { ColorName, Colors } from '../../../constants/Colors';
import { Button } from '../../Controls/Button';
import { EditIcon } from '../../Icons/EditIcon';
import { SelectOption, SelectPopover } from '../SelectPopover';
import { colorSelectStyles } from './style';

export type ColorSelectOption = {
  value: ColorName;
  label: string;
  hexValue: string;
};

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
  const [value, setValue] = useState(
    options.find(color => color.value === selectedColorName)
  );

  const handleChange = (newValue: ValueType<SelectOption, boolean>) => {
    const selectedOption = newValue as ColorSelectOption;
    setValue(selectedOption);
    onChange(selectedOption.value);
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
        <EditIcon />
      </Button>
    </SelectPopover>
  );
};
