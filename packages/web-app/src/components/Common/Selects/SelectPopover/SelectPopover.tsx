import { ReactNode, useState } from 'react';
import { InputActionMeta, mergeStyles, OnChangeValue, Props } from 'react-select';
import Select from 'react-select/';
import CreatableSelect from 'react-select/creatable';
import { PopoverAlign } from 'react-tiny-popover';
import { CloseButton } from '../../Controls/CloseButton';
import { Popover } from '../../Misc/Popover';
import { commonSelectStyles } from './style';

export type SelectOption = {
  value: string;
  label: string;
  // for LabelSelect
  hexValue?: string;
};

type SelectPopoverProps = {
  headerText: string;
  onChange: (value: OnChangeValue<SelectOption, boolean>) => void;
  children: ReactNode;
  popoverAlign?: PopoverAlign;
  isCreatable?: boolean;
  onCreateOption?: (value: string) => void;
  formatCreateLabel?: (value: string) => string;
} & Props<SelectOption, boolean>;

/**
 * Core select component with popover used in actual re-usable selects.
 * Provides some core functionality and styles.
 */
export const SelectPopover = ({
  onChange,
  isCreatable,
  styles,
  headerText,
  children,
  popoverAlign,
  ...rest
}: SelectPopoverProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
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

  const handleChange = (newValues: OnChangeValue<SelectOption, boolean>) => {
    !isCreatable && closePopover();
    onChange(newValues);
  };

  const mergedProps: Props<SelectOption, boolean> = {
    placeholder: `Search${isCreatable ? ' or create new' : ''}`,
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
    styles: styles ? mergeStyles(commonSelectStyles, styles) : commonSelectStyles,
    ...rest,
  };

  const openPopover = () => {
    setIsPopoverOpen(true);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
    setInputValue('');
  };

  return (
    <Popover
      align={popoverAlign ?? 'end'}
      isOpen={isPopoverOpen}
      onClickOutside={closePopover}
      content={
        <>
          <Popover.Header>
            <Popover.Title>{headerText}</Popover.Title>
            <CloseButton onClick={closePopover} />
          </Popover.Header>
          {isCreatable ? <CreatableSelect {...mergedProps} /> : <Select {...mergedProps} />}
        </>
      }
    >
      <div onClick={isPopoverOpen ? closePopover : openPopover}>
        {/* popover toggle container */}
        {children}
      </div>
    </Popover>
  );
};
