import { Styles } from 'react-select';
import styles from '../../../styles/common/_settings.scss';
import { colorDot, OptionStyleArguments } from '../Select/style';

const LabelSelectStyles: Partial<Styles> = {
  control: base => ({
    ...base,
    width: '30rem',
  }),
  menu: () => ({
    width: '31.2rem',
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
