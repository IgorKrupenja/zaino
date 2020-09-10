import { Styles } from 'react-select';
import checkbox from '../../../images/ui/check-mark.svg';
import settings from '../../../styles/common/_settings.scss';
import { OptionArguments } from '../ColorSelect/style';

// todo code dupe
const SelectStyles: Partial<Styles> = {
  control: (styles, { isFocused }) => ({
    ...styles,
    margin: settings.xsSize,
    minHeight: settings.xlSize,
    height: settings.xlSize,
    width: '30rem',
    overflow: 'hidden',
    borderColor: isFocused ? settings.lightBlue : styles.borderColor,
    '&:hover': {
      borderColor: isFocused ? settings.lightBlue : settings.midGrey,
    },
  }),
  valueContainer: () => ({
    paddingLeft: settings.xsSize,
    fontSize: settings.sSize,
  }),
  menu: () => ({
    borderTop: settings.border,
    width: '31.2rem',
  }),
  input: styles => ({
    ...styles,
  }),
  noOptionsMessage: styles => ({
    ...styles,
    padding: `${settings.xsSize} 0 0 0`,
  }),
  // todo this is overwritten
  option: (styles, { data, isFocused, isSelected }: OptionArguments) => {
    return {
      ...styles,
      // todo checkbox
      backgroundImage: isSelected ? `url("${checkbox}")` : '',
      backgroundRepeat: 'no-repeat',
    };
  },
};

export default SelectStyles;
