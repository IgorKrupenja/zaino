import { StylesConfig } from 'react-select';

import { SelectOption } from '../../../../types';

export const sortSelectStyles: Partial<StylesConfig<SelectOption, boolean>> = {
  menu: () => ({
    borderTop: 'none',
  }),
};
