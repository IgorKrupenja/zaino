import chroma from 'chroma-js';
import { Styles } from 'react-select';
import cssSettings from '../../../styles/common/_settings.scss';
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
    height: 10,
    width: 10,
  },
});

// todo code dupe
const LabelSelectStyles: Partial<Styles> = {
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    minWidth: 240,
    margin: cssSettings.xsSize,
  }),
  menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
  option: (styles, { data, isFocused, isSelected }: OptionArguments) => {
    // todo #00BDFE is temp color (sky)
    const color = chroma(!data.__isNew__ ? data.hexValue : '#00BDFE');
    return {
      ...styles,
      backgroundColor: isFocused ? color.alpha(0.1).css() : 'white',
      color: data.hexValue,
      // todo checkbox
      backgroundImage: isSelected
        ? 'url("https://storage.googleapis.com/zaino-2e6cf.appspot.com/categories/knife.svg")'
        : '',
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
