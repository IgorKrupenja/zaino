import { ReactNode, useEffect, useState } from 'react';
import { InputActionMeta, mergeStyles, OnChangeValue, Props } from 'react-select';
import Select from 'react-select/';
import CreatableSelect from 'react-select/creatable';
import { PopoverAlign } from 'react-tiny-popover';
import { CloseButton } from '../../controls/CloseButton';
import { Popover } from '../../misc/Popover';
import { commonSelectStyles } from './style';

export type SelectOption = {
  value: string;
  label: string;
  hexValue?: string;
};

type SelectPopoverProps = {
  headerText: string;
  onChange: (value: OnChangeValue<SelectOption, boolean>) => void;
  popoverAlign?: PopoverAlign;
  isCreatable?: boolean;
  onCreateOption?: (value: string) => void;
  formatCreateLabel?: (value: string) => string;
  children: ReactNode;
} & Props<SelectOption, boolean>;

/**
 * Core select component with popover used in actual re-usable selects.
 * Provides some core functionality and styles.
 */
export const SelectPopover = ({
  headerText,
  onChange,
  popoverAlign,
  isCreatable,
  children,
  styles,
  ...rest
}: SelectPopoverProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Clean up function to cancel async tasks to prevent error on Link click
  useEffect(() => () => {}, []);

  const handleInputChange = (newInputValue: string, actionMeta: InputActionMeta) => {
    if (actionMeta.action === 'input-change') setInputValue(newInputValue);
  };

  const handleChange = (newValues: OnChangeValue<SelectOption, boolean>) => {
    !isCreatable && closePopover();
    onChange(newValues);
  };

  const mergedProps: Props<SelectOption, boolean> = {
    autoFocus: true,
    backspaceRemovesValue: false,
    components: { DropdownIndicator: null, IndicatorSeparator: null },
    controlShouldRenderValue: false,
    hideSelectedOptions: false,
    inputValue,
    isClearable: false,
    menuIsOpen: true,
    onChange: handleChange,
    onInputChange: handleInputChange,
    placeholder: `Search${isCreatable ? ' or create new' : ''}`,
    styles: styles ? mergeStyles(commonSelectStyles, styles) : commonSelectStyles,
    ...rest,
  };

  // todo fishy. can just merge two fns? and use useToggle?
  const openPopover = () => setIsPopoverOpen(true);

  const closePopover = () => {
    setIsPopoverOpen(false);
    setInputValue('');
  };

  return (
    <Popover
      align={popoverAlign ?? 'end'}
      content={
        <>
          <Popover.Header>
            <Popover.Title>{headerText}</Popover.Title>
            <CloseButton onClick={closePopover} />
          </Popover.Header>
          {isCreatable ? <CreatableSelect {...mergedProps} /> : <Select {...mergedProps} />}
        </>
      }
      isOpen={isPopoverOpen}
      onClickOutside={closePopover}
    >
      <div onClick={isPopoverOpen ? closePopover : openPopover}>{children}</div>
    </Popover>
  );
};
