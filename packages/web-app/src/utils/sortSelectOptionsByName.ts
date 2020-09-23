import { SelectOption } from '../types/SelectOption';

// should be used when implementing #331
export const sortSelectOptionsByName = (a: SelectOption, b: SelectOption) => {
  return a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1;
};
