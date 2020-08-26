import chroma from 'chroma-js';
import { Styles } from 'react-select';
import { OptionArguments } from './colorSelect';

// todo code dupe
const LabelSelectStyles: Partial<Styles> = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isFocused, isSelected }: OptionArguments) => {
    // todo bug #187
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isSelected ? data.color : isFocused ? color.alpha(0.1).css() : 'white',
      color: isSelected ? (chroma.contrast(color, 'white') > 2 ? 'white' : 'black') : data.color,

      ':active': {
        backgroundColor: isSelected ? data.color : color.alpha(0.3).css(),
      },
    };
  },
  multiValue: (styles, { data }: OptionArguments) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }: OptionArguments) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }: OptionArguments) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

export default LabelSelectStyles;
