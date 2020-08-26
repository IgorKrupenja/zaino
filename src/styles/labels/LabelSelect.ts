import chroma from 'chroma-js';
import { Styles } from 'react-select';
import { OptionArguments } from './colorSelect';

// todo code dupe
const LabelSelectStyles: Partial<Styles> = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isFocused, isSelected }: OptionArguments) => {
    // todo #00BDFE is temp color (sky)
    const color = chroma(!data.__isNew__ ? data.hexValue : '#00BDFE');
    return {
      ...styles,
      backgroundColor: isSelected ? data.hexValue : isFocused ? color.alpha(0.1).css() : 'white',
      color: isSelected ? (chroma.contrast(color, 'white') > 2 ? 'white' : 'black') : data.hexValue,

      ':active': {
        backgroundColor: isSelected ? data.hexValue : color.alpha(0.3).css(),
      },
    };
  },
  multiValue: (styles, { data }: OptionArguments) => {
    console.log(data);
    const color = chroma(data.hexValue);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }: OptionArguments) => ({
    ...styles,
    color: data.hexValue,
  }),
  multiValueRemove: (styles, { data }: OptionArguments) => ({
    ...styles,
    color: data.hexValue,
    ':hover': {
      backgroundColor: data.hexValue,
      color: 'white',
    },
  }),
};

export default LabelSelectStyles;
