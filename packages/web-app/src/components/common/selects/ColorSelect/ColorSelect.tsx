import { ColorName } from '@zaino/shared';
import { useRef, useState } from 'react';
import { OnChangeValue } from 'react-select';
import { colors } from '../../../../constants';
import { Button } from '../../controls/Button';
import { EditIcon } from '../../icons/EditIcon';
import { SelectOption, SelectPopover } from '../SelectPopover';
import { colorSelectStyles } from './style';

type ColorSelectOption = {
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
      styles={colorSelectStyles}
      value={value}
    >
      <Button variant="transparent">
        Color
        <EditIcon />
      </Button>
    </SelectPopover>
  );
};
