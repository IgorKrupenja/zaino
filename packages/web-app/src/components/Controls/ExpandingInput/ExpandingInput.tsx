import React, { ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import ReactExpandingTextarea from 'react-expanding-textarea';
import { getClassString } from '../../../utils/getClassString';
import './style.scss';

type ExpandingInputProps = {
  className?: string;
  name?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  clearError?: () => void;
  onSubmit?: (e?: FormEvent<HTMLFormElement>) => void;
};

export const ExpandingInput = ({
  name,
  value,
  error,
  clearError,
  onChange,
  className,
  onSubmit,
  ...rest
}: ExpandingInputProps) => {
  const elementProps = {
    // id needed to focus input on label click
    id: name,
    name,
    value,
    className: 'expanding-input' + (error ? ' input--error' : '') + getClassString(className),
    ...rest,
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // expanding: submit on enter instead of inserting a line break
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit && onSubmit();
    }
  };

  return (
    <ReactExpandingTextarea
      {...elementProps}
      value={String(value)}
      onChange={e => {
        clearError && clearError();
        onChange && onChange(e as ChangeEvent<HTMLTextAreaElement>);
      }}
      autoFocus
      onFocus={e => {
        // puts cursor at the end on focus
        const value = e.target.value;
        e.target.value = '';
        e.target.value = value;
      }}
      onKeyPress={handleKeyPress}
    />
  );
};
