import { StylesConfig } from 'react-select';

import { SelectOption } from '../SelectPopover';

export const sortSelectStyles: Partial<StylesConfig<SelectOption, boolean>> = {
  menu: () => ({
    borderTop: 'none',
  }),
};
