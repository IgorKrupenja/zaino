import React from 'react';
import Select, { OptionTypeBase, ValueType } from 'react-select';
import Colors, { ColorName } from '../../constants/Colors';
import colorSelectStyles from '../../styles/labels/colorSelect';

export type ColorSelectOption = {
  value: string;
  label: string;
};

type ColorSelectProps = {
  selectedColorName: ColorName;
  onChange: (colorName: ColorName) => void;
};

const ColorSelect = ({ selectedColorName, onChange }: ColorSelectProps) => {
  const options = Colors.map(color => ({
    value: color.name,
    label: color.name,
    hexValue: color.hexValue,
  }));
  const handleChange = (newValue: ValueType<OptionTypeBase>) => {
    onChange((newValue as OptionTypeBase)?.label);
  };

  return (
    <label>
      Color
      <Select
        className="single-select"
        isSearchable={false}
        defaultValue={options.find(color => color.value === selectedColorName)}
        name="categoryName"
        options={options}
        styles={colorSelectStyles}
        onChange={handleChange}
      />
    </label>
  );
};

export default ColorSelect;
