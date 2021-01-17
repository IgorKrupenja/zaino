import { Styles } from 'react-select';
import { SelectOption } from '../SelectPopover';
import { colorDot, OptionStyleArguments } from '../SelectPopover/style';

export const colorSelectStyles: Partial<Styles<SelectOption, boolean>> = {
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
};
