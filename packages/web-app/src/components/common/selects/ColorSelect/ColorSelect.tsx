import { ColorName } from '@zaino/shared';
import { useRef, useState } from 'react';
import { OnChangeValue } from 'react-select';

import { colors } from '../../../../constants';
import { SelectOption } from '../../../../types';
import { Button } from '../../controls/Button';
import { EditIcon } from '../../icons/EditIcon';
import { SelectPopover } from '../SelectPopover';
import { colorSelectStyle } from './ColorSelect.style';

type ColorSelectOption = {
  hexValue: string;
  label: string;
  value: ColorName;
};

type ColorSelectProps = {
  onChange: (colorName: ColorName) => void;
  selectedColorName: ColorName;
};

export const ColorSelect = ({ selectedColorName, onChange }: ColorSelectProps) => {
  const options = useRef(
    colors.map((color) => ({
      hexValue: color.hexValue,
      label: color.fancyName,
      value: color.name,
    }))
  ).current;
  const [value, setValue] = useState(options.find((color) => color.value === selectedColorName));

  const handleChange = (newValue: OnChangeValue<SelectOption, boolean>) => {
    const selectedOption = newValue as ColorSelectOption;
    setValue(selectedOption);
    onChange(selectedOption.value);
  };

  return (
    <SelectPopover
      components={{ Control: () => null, IndicatorSeparator: null }}
      headerText="Select color"
      name="categoryName"
      onChange={handleChange}
      options={options}
      styles={colorSelectStyle}
      value={value}
    >
      <Button variant="transparent">
        Color
        <EditIcon />
      </Button>
    </SelectPopover>
  );
};
