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
      value: color.name,
      label: color.fancyName,
      hexValue: color.hexValue,
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
