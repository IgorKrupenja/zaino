import { Styles } from 'react-select';
import styles from '../../../styles/base/_settings.scss';
import { colorDot, OptionStyleArguments } from '../Select/style';

const LabelSelectStyles: Partial<Styles> = {
  control: base => ({
    ...base,
  }),
  menu: () => ({
    borderTop: styles.border,
  }),
  option: (base, { data }: OptionStyleArguments) => ({
    ...base,
    ...colorDot(data.hexValue),
    color: data.hexValue,
    paddingLeft: styles.sSize,
  }),
};

export default LabelSelectStyles;
