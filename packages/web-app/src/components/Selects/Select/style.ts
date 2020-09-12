import { Color } from '@zaino/shared';
import { Styles } from 'react-select';
import checkbox from '../../../images/ui/check-mark.svg';
import styles from '../../../styles/common/_settings.scss';

// CSS-in-JS is used here as this is the recommended method for react-select

const commonSelectStyles: Partial<Styles> = {
  control: (base, { isFocused }) => ({
    ...base,
    margin: styles.xsSize,
    minHeight: styles.xlSize,
    height: styles.xlSize,
    overflow: 'hidden',
    borderColor: isFocused ? styles.lightBlue : base.borderColor,
    borderRadius: styles.xsSize,
    '&:hover': {
      borderColor: isFocused ? styles.lightBlue : styles.midGrey,
    },
  }),
  valueContainer: () => ({
    paddingLeft: styles.xsSize,
    fontSize: styles.sSize,
  }),
  menu: () => ({
    borderTop: styles.border,
  }),
  noOptionsMessage: base => ({
    ...base,
    padding: `${styles.xsSize} ${styles.sSize} 0 ${styles.sSize}`,
    height: styles.xlSize,
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundImage: isSelected ? `url("${checkbox as string}")` : '',
    backgroundRepeat: 'no-repeat',
    paddingTop: styles.xsSize,
    paddingBottom: styles.xsSize,
    paddingLeft: styles.xlSize,
    backgroundColor: isFocused ? styles.offWhite : 'white',
    backgroundPositionX: '1rem',
    backgroundPositionY: 'center',
    backgroundSize: styles.lSize,
    fontSize: styles.sSize,
    color: styles.darkGrey,
    cursor: 'pointer',

    ':active': {
      backgroundColor: styles.extraLightGrey,
    },
  }),
};

export type OptionStyleArguments = {
  // for some reason react-select requires this key to be named "data", breaks otherwise
  data: Color;
  isFocused?: boolean;
  isSelected?: boolean;
};

export const colorDot = (color = styles.lightGrey, marginLeft = '2.2rem') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: '1rem',
    content: '" "',
    display: 'block',
    marginLeft,
    marginRight: '0.7rem',
    height: '1.2rem',
    minWidth: '1.2rem',
  },
});

export default commonSelectStyles;
