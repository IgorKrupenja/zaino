import { Styles } from 'react-select';
import { Color } from '../../../constants/Colors';
import checkbox from '../../../images/icons/check-mark.svg';
import styles from '../../../styles/base/_settings.scss';

// CSS-in-JS is used here as this is the recommended method for react-select

const commonSelectStyles: Partial<Styles> = {
  control: (base, { isFocused }) => ({
    ...base,
    margin: styles.xsSize,
    borderColor: isFocused ? styles.lightBlue : styles.lightGrey,
    boxShadow: isFocused ? styles.inputShadow : 'none',
    borderRadius: styles.xsSize,
    minHeight: styles.xlSize,
    height: styles.xlSize,
    maxWidth: '30rem',
    overflow: 'hidden',
    backgroundColor: isFocused ? 'white' : styles.offWhite,

    '&:hover': {
      borderColor: isFocused ? styles.lightBlue : styles.midGrey,
      boxShadow: isFocused ? styles.inputShadow : 'none',
    },
  }),
  valueContainer: () => ({
    paddingLeft: styles.xsSize,
    fontSize: styles.sSize,
  }),
  menu: () => ({
    borderTop: styles.border,
    maxWidth: '31.2rem',
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
    fontSize: styles.fontSizeSmall,
    color: styles.offBlack,
    cursor: 'pointer',

    ':active': {
      backgroundColor: styles.extraLightGrey,
    },
  }),
};

export const popoverToggleStyle = { display: 'inline-block' };

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
