import { Styles } from 'react-select';
import { colorDot, OptionStyleArguments } from '../Select/style';

const colorSelectStyles: Partial<Styles> = {
  menu: () => ({
    borderTop: 'none',
  }),
  option: (base, { data }: OptionStyleArguments) => {
    return {
      ...base,
      ...colorDot(data.hexValue, '0.2rem'),
    };
  },
  singleValue: (styles, { data }: OptionStyleArguments) => ({
    ...styles,
    ...colorDot(data.hexValue, '0.2rem'),
  }),
};

export default colorSelectStyles;
