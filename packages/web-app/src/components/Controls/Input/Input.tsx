import React, { ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import ReactExpandingTextarea from 'react-expanding-textarea';
import { getClassString } from '../../../utils/getClassString';
import './style.scss';

type InputProps = {
  className?: string;
  value: string | number;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  autoFocus?: boolean;
  clearError?: (e?: ChangeEvent<HTMLInputElement>) => void;
  isExpanding?: boolean;
  onSubmit?: (e?: FormEvent<HTMLFormElement>) => void;
  maxLength?: number;
  placeholder?: string;
};

export const Input = ({
  className,
  name,
  error,
  value,
  onSubmit,
  isExpanding,
  onChange,
  clearError,
  ...rest
}: InputProps) => {
  const elementProps = {
    // id needed to focus input on label click
    id: name,
    name,
    value,
    className:
      'input' +
      (error ? ' input--error' : '') +
      (isExpanding ? ' input--expanding' : '') +
      getClassString(className),
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
    <>
      {isExpanding ? (
        <ReactExpandingTextarea
          {...elementProps}
          value={String(value)}
          onChange={e => {
            clearError && clearError();
            onChange && onChange(e as ChangeEvent<HTMLTextAreaElement>);
          }}
          onFocus={e => {
            // puts cursor at the end on focus
            const value = e.target.value;
            e.target.value = '';
            e.target.value = value;
          }}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <input
          type="text"
          {...elementProps}
          onChange={e => {
            clearError && clearError(e);
            onChange && onChange(e);
          }}
        />
      )}
      {error && <span className="input__error-message">{error}</span>}
    </>
  );
};