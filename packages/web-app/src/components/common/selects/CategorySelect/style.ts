import { StylesConfig } from 'react-select';

import styles from '../../../../styles/base/_export.scss';
import { SelectOption } from '../SelectPopover';

export const categorySelectStyles: Partial<StylesConfig<SelectOption, boolean>> = {
  // setting widths manually is a workaround to prevent control text overflow issues
  control: (base) => ({
    ...base,
    width: '16.8rem',
  }),
  input: (base) => ({
    ...base,
    width: '15rem',
  }),
  menu: () => ({
    borderTop: styles.border,
    width: '18rem',
  }),
};
