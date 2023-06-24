import { StylesConfig } from 'react-select';

import styles from '../../../../styles/base/_export.scss';
import { SelectOption } from '../../../../types';
import { colorDotStyle } from '../ColorDot/ColorDot.style';

export const labelSelectStyle: Partial<StylesConfig<SelectOption, boolean>> = {
  // Setting widths manually is a workaround to prevent control text overflow issues
  control: (base) => ({
    ...base,
    width: '21.8rem',
  }),
  input: (base) => ({
    ...base,
    // TODO: breaks placeholder text, see #269
    width: '22rem',
  }),
  menu: () => ({
    borderTop: styles.border,
    overflowWrap: 'anywhere',
    width: '23rem',
  }),
  option: (base, props) => ({
    ...base,
    ...colorDotStyle(props.data.hexValue),
    color: props.data.hexValue,
    paddingLeft: styles.sSize,
  }),
};
