import { Styles } from 'react-select';
import checkbox from '../../../images/ui/done.svg';
import cssSettings from '../../../styles/common/_settings.scss';
import { OptionArguments } from '../ColorSelect/style';

// todo code dupe
const SelectStyles: Partial<Styles> = {
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    minWidth: 240,
    margin: cssSettings.xsSize,
  }),
  // margin is a workaround for overflow issues
  menu: () => ({
    borderTop: `0.1rem ${cssSettings.lightGrey} solid`,
    marginBottom: '0.4rem',
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
