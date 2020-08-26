import chroma from 'chroma-js';
import { Styles } from 'react-select';
import { LabelColorOption } from '../../constants/labelColorOptions';

// CSS-in-JS is used here as this is the recommended method for react-select

// Unused ideas:
// ocean, sun, tree, earth, spring, summer
// also e.g. https://cdn.shopify.com/s/files/1/0028/6733/1137/products/Brio_Custom_colors_6x6_with_names_db281676-fbca-4e31-80d3-6cd5c98cca08_1400x.jpg?v=1571087350

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

// todo move to another file?
export type OptionArguments = {
  data: LabelColorOption;
  isFocused?: boolean;
  isSelected?: boolean;
};

// todo code dupe
const colorSelectStyles: Partial<Styles> = {
  option: (styles, { data, isFocused, isSelected }: OptionArguments) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isSelected ? data.color : isFocused ? color.alpha(0.1).css() : 'white',
      color: isSelected ? 'white' : data.color,
      ':active': {
        backgroundColor: isSelected ? data.color : color.alpha(0.3).css(),
      },
    };
  },
  input: styles => ({ ...styles, ...dot() }),
  placeholder: styles => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }: { data: LabelColorOption }) => ({
    ...styles,
    ...dot(data.color),
  }),
};

export default colorSelectStyles;