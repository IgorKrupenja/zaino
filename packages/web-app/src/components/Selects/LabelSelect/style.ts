import chroma from 'chroma-js';
import { Styles } from 'react-select';
import { OptionArguments } from '../ColorSelect/style';

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginLeft: 24,
    marginRight: 8,
    height: 12,
    width: 12,
  },
});

// todo code dupe
const LabelSelectStyles: Partial<Styles> = {
  option: (styles, { data, isFocused, isSelected }: OptionArguments) => {
    // todo #00BDFE is temp color (sky)
    const color = chroma(!data.__isNew__ ? data.hexValue : '#00BDFE');
    return {
      ...styles,
      backgroundColor: isFocused ? color.alpha(0.1).css() : 'white',
      color: data.hexValue,
      // todo need to overwrite
      backgroundImage: isSelected ? 'url("../../../../images/ui/done.svg")' : '',
      backgroundRepeat: 'no-repeat',
      ':active': {
        backgroundColor: color.alpha(0.3).css(),
      },
      ...dot(data.hexValue),
    };
  },
  multiValue: (styles, { data }: OptionArguments) => {
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
