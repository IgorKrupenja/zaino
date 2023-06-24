import { StylesConfig } from 'react-select';

import { SelectOption } from '../../../../types';

export const sortSelectStyle: Partial<StylesConfig<SelectOption, boolean>> = {
  menu: () => ({
    borderTop: 'none',
  }),
};
