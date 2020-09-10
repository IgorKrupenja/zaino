import React from 'react';
import SelectDefault, { Props } from 'react-select';
import CreatableSelectDefault from 'react-select/creatable';
import SelectStyles from './style';

// todo prop types #267
export const Select = (props: Props<any>) => {
  const { isCreatable, styles, ...rest } = props;
  const mergedProps = {
    autoFocus: true,
    hideSelectedOptions: false,
    controlShouldRenderValue: false,
    components: { IndicatorSeparator: null },
    menuIsOpen: true,
    isClearable: false,
    // merge default select styles and styles passed as props
    styles: { ...SelectStyles, ...styles },
    ...rest,
  };

  return isCreatable ? (
    <CreatableSelectDefault {...mergedProps} />
  ) : (
    <SelectDefault {...mergedProps} />
  );
};
