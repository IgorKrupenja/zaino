import { StylesConfig } from 'react-select';

import { SelectOption } from '../../../../types';
import { colorDotStyle } from '../ColorDot/ColorDot.style';

export const colorSelectStyle: Partial<StylesConfig<SelectOption, boolean>> = {
  menu: () => ({
    borderTop: 'none',
    width: '14rem',
  }),
  option: (base, props) => ({
    ...base,
    ...colorDotStyle(props.data.hexValue, '0.2rem'),
  }),
};
