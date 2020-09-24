import React, { ReactNode, useState } from 'react';
import { InputActionMeta, mergeStyles, Props, ValueType } from 'react-select';
import Select from 'react-select/';
import CreatableSelect from 'react-select/creatable';
import useToggle from '../../../hooks/useToggle';
import { SelectOption } from '../../../types/SelectOption';
import { CloseButton } from '../../Controls/CloseButton';
import { Popover } from '../../Popover/Popover';
import { PopoverHeader } from '../../Popover/PopoverHeader';
import commonSelectStyles, { popoverToggleStyle } from './style';

type SelectPopoverProps = {
  isCreatable?: boolean;
  headerText: string;
  onChange: (value: ValueType<SelectOption>) => void;
  children: ReactNode;
} & Props<SelectOption>;

/**
 * Core select component with popover used in actual re-usable selects.
 * Provides some core functionality and styles.
 */
export const SelectPopover = (props: SelectPopoverProps) => {
  const [isPopoverOpen, togglePopover] = useToggle();
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

  const { onChange, isCreatable, styles, headerText, children, ...rest } = props;

  const handleChange = (newValues: ValueType<SelectOption>) => {
    !isCreatable && togglePopover();
    onChange(newValues);
  };

  const mergedProps: Props<SelectOption> = {
    placeholder: `Search${isCreatable ? ' or create' : ''}`,
    autoFocus: true,
    hideSelectedOptions: false,
    controlShouldRenderValue: false,
    components: { IndicatorSeparator: null, DropdownIndicator: null },
    menuIsOpen: true,
    isClearable: false,
    backspaceRemovesValue: false,
    onInputChange: handleInputChange,
    inputValue,
    onChange: handleChange,
    // merge common select styles and styles passed as props
    styles: styles ? mergeStyles(commonSelectStyles, styles) : commonSelectStyles,
    ...rest,
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClickOutside={togglePopover}
      content={
        <>
          <PopoverHeader text={headerText}>
            <CloseButton onClick={togglePopover} />
          </PopoverHeader>
          {isCreatable ? <CreatableSelect {...mergedProps} /> : <Select {...mergedProps} />}
        </>
      }
    >
      <div style={popoverToggleStyle} onClick={togglePopover}>
        {/* popover toggle container */}
        {children}
      </div>
    </Popover>
  );
};
