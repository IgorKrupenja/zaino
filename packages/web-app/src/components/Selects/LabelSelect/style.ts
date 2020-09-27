import { Styles } from 'react-select';
import styles from '../../../styles/base/_settings.scss';
import { colorDot, OptionStyleArguments } from '../SelectPopover/style';

export const labelSelectStyles: Partial<Styles> = {
  // setting widths manually is a workaround to prevent control text overflow issues
  control: base => ({
    ...base,
    width: '26.8rem',
  }),
  menu: () => ({
    borderTop: styles.border,
    overflowWrap: 'anywhere',
    width: '28rem',
  }),
  input: base => ({
    ...base,
    width: '25rem',
  }),
  option: (base, { data }: OptionStyleArguments) => ({
    ...base,
    ...colorDot(data.hexValue),
    color: data.hexValue,
    paddingLeft: styles.sSize,
  }),
};
