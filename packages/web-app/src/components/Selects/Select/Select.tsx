import React from 'react';
import SelectDefault, { Props } from 'react-select';
import CreatableSelectDefault from 'react-select/creatable';

// type SelectProps = {
//   isMulti: boolean;
//   onChange: (newValues: ValueType<LabelSelectOption>) => void;
//   styles: Partial<Styles>;
//   value: ValueType<LabelSelectOption>;
//   placeholder: string;
//   onCreateOption: (inputValue: string) => void;
// };

// todo prop types #267
export const Select = (props: Props<any>) => {
  const { isCreatable, ...rest } = props;
  const mergedProps = {
    autoFocus: true,
    hideSelectedOptions: false,
    controlShouldRenderValue: false,
    components: { IndicatorSeparator: null },
    menuIsOpen: true,
    isClearable: false,
    ...rest,
  };

  return isCreatable ? (
    <CreatableSelectDefault {...mergedProps} />
  ) : (
    <SelectDefault {...mergedProps} />
  );
};
