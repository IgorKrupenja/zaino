import { StylesConfig } from 'react-select';

import checkbox from '../../../../images/icons/check-mark.svg';
import styles from '../../../../styles/base/_export.scss';
import { SelectOption } from '../../../../types';

// CSS-in-JS is used for selects as this is the recommended method for react-select.

export const commonSelectStyles: Partial<StylesConfig<SelectOption, boolean>> = {
  control: (base, { isFocused }) => ({
    ...base,
    '&:hover': {
      borderColor: isFocused ? styles.lightBlue : styles.midGrey,
      boxShadow: isFocused ? styles.inputShadow : 'none',
    },
    backgroundColor: isFocused ? 'white' : styles.offWhite,
    borderColor: isFocused ? styles.lightBlue : styles.lightGrey,
    borderRadius: styles.xsSize,
    boxShadow: isFocused ? styles.inputShadow : 'none',
    height: styles.xlSize,
    margin: styles.xsSize,
    minHeight: styles.xlSize,
    overflow: 'hidden',
  }),
  input: (base) => ({
    ...base,
    overflow: 'hidden',
  }),
  menu: () => ({
    borderTop: styles.border,
  }),
  noOptionsMessage: (base) => ({
    ...base,
    height: styles.xlSize,
    padding: `${styles.xsSize} ${styles.sSize} 0 ${styles.sSize}`,
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    ':active': {
      backgroundColor: styles.extraLightGrey,
    },
    backgroundColor: isFocused ? styles.offWhite : 'white',
    backgroundImage: isSelected ? `url("${checkbox}")` : '',
    backgroundPositionX: '1rem',
    backgroundPositionY: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: styles.lSize,
    color: styles.offBlack,
    cursor: 'pointer',
    fontSize: styles.fontSizeSmall,
    paddingBottom: styles.xsSize,
    paddingLeft: styles.xlSize,
    paddingTop: styles.xsSize,
  }),
  placeholder: (base, { isFocused }) => ({
    ...base,
    display: isFocused ? 'none' : 'block',
    paddingTop: '0.5rem',
    width: '100%',
  }),
  valueContainer: () => ({
    display: 'flex',
    fontSize: styles.sSize,
    paddingLeft: styles.xsSize,
  }),
};

export const colorDot = (color = styles.lightGrey, marginLeft = '2.2rem') => ({
  ':before': {
    backgroundColor: color,
    borderRadius: '1rem',
    content: '" "',
    display: 'block',
    height: '1.2rem',
    marginLeft,
    marginRight: '0.7rem',
    minWidth: '1.2rem',
  },
  alignItems: 'center',
  display: 'flex',
});
