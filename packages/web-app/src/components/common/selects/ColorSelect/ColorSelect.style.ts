import { StylesConfig } from 'react-select';

import { SelectOption } from '../SelectPopover';
import { colorDot } from '../SelectPopover/SelectPopover.style';

export const colorSelectStyles: Partial<StylesConfig<SelectOption, boolean>> = {
  menu: () => ({
    borderTop: 'none',
    width: '14rem',
  }),
  option: (base, props) => ({
    ...base,
    ...colorDot(props.data.hexValue, '0.2rem'),
  }),
};
