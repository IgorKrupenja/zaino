import { ColorName, Colors } from '@zaino/shared';
import React, { useRef, useState } from 'react';
import { ValueType } from 'react-select';
import DropdownIcon from '../../../images/icons/drop-down.svg';
import { SelectOption } from '../../../types/SelectOption';
import { Button } from '../../Controls/Button';
import { SelectPopover } from '../SelectPopover';
import styles from './style';

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
      styles={styles}
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
