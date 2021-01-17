import { Styles } from 'react-select';
import { SelectOption } from '../SelectPopover';

export const sortSelectStyles: Partial<Styles<SelectOption, boolean>> = {
  menu: () => ({
    borderTop: 'none',
  }),
};
