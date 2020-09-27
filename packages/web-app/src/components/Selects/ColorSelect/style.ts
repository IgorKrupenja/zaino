import { Styles } from 'react-select';
import { colorDot, OptionStyleArguments } from '../SelectPopover/style';

export const colorSelectStyles: Partial<Styles> = {
  menu: () => ({
    borderTop: 'none',
    width: '14rem',
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
