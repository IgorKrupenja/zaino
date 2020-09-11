import React, { useState } from 'react';
import DefaultSelect, { InputActionMeta, mergeStyles, Props } from 'react-select';
import DefaultCreatableSelect from 'react-select/creatable';
import commonSelectStyles from './style';

/**
 * Core select component used in actual re-usable selects.
 * Provides some core functionality and styles.
 */
// todo prop types #267
export const Select = (props: Props<any>) => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (newInputValue: string, actionMeta: InputActionMeta) => {
    if (
      actionMeta.action === 'set-value' ||
      actionMeta.action === 'input-blur' ||
      actionMeta.action === 'menu-close'
    ) {
      // needed to prevent full option list flashes when closing menu
      // and input getting cleared when clicking on it if has text entered
      return;
    } else {
      setInputValue(newInputValue);
    }
  };

  const { isCreatable, styles, ...rest } = props;
  const mergedProps = {
    autoFocus: true,
    hideSelectedOptions: false,
    controlShouldRenderValue: false,
    components: { IndicatorSeparator: null, DropdownIndicator: null },
    menuIsOpen: true,
    isClearable: false,
    backspaceRemovesValue: false,
    onInputChange: handleInputChange,
    inputValue,
    // merge common select styles and styles passed as props
    styles: styles ? mergeStyles(commonSelectStyles, styles) : commonSelectStyles,
    ...rest,
  };

  return isCreatable ? (
    <DefaultCreatableSelect {...mergedProps} />
  ) : (
    <DefaultSelect {...mergedProps} />
  );
};
