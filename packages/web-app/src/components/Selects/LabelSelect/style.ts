import { Styles } from 'react-select';
import styles from '../../../styles/base/_settings.scss';
import { colorDot, OptionStyleArguments } from '../SelectPopover/style';

export const labelSelectStyles: Partial<Styles> = {
  // setting widths manually is a workaround to prevent control text overflow issues
  control: base => ({
    ...base,
    width: '21.8rem',
  }),
  menu: () => ({
    borderTop: styles.border,
    overflowWrap: 'anywhere',
    width: '23rem',
  }),
  input: base => ({
    ...base,
    width: '20rem',
  }),
  option: (base, { data }: OptionStyleArguments) => ({
    ...base,
    ...colorDot(data.hexValue),
    color: data.hexValue,
    paddingLeft: styles.sSize,
  }),
};
