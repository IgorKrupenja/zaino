import { Styles } from 'react-select';
import settings from '../../../styles/common/_settings.scss';
import { OptionArguments } from '../ColorSelect/style';

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginLeft: 22,
    marginRight: 8,
    height: 12,
    minWidth: 12,
  },
});

const LabelSelectStyles: Partial<Styles> = {
  option: (styles, { data, isFocused, isSelected }: OptionArguments) => {
    return {
      ...styles,
      ...dot(data.hexValue),
      paddingTop: settings.xsSize,
      paddingBottom: settings.xsSize,
      backgroundColor: isFocused ? settings.offWhite : 'white',
      // todo need to overwrite
      backgroundImage: isSelected ? 'url("../../../../images/ui/check-mark.svg")' : '',
      backgroundRepeat: 'no-repeat',
      backgroundPositionY: 'center',
      backgroundPositionX: '1rem',
      backgroundSize: settings.lSize,
      color: data.hexValue,
      fontSize: settings.sSize,
      // overflow: 'hidden',
      // whiteSpace: 'nowrap',
      cursor: 'pointer',
      ':active': {
        backgroundColor: settings.extraLightGrey,
      },
    };
  },
};

export default LabelSelectStyles;
