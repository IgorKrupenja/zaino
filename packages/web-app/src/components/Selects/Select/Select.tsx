import React, { useState } from 'react';
import SelectDefault, { InputActionMeta, Props } from 'react-select';
import CreatableSelectDefault from 'react-select/creatable';
// import SearchIcon from '../../../images/ui/search.svg';
import SelectStyles from './style';

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
