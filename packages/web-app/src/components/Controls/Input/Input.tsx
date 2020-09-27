import React, { ChangeEvent, FormEvent, KeyboardEvent, ReactNode } from 'react';
import Textarea from 'react-expanding-textarea';
import './style.scss';

type InputProps = {
  value: string | number;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  autoFocus?: boolean;
  children?: ReactNode;
  clearError?: (e?: ChangeEvent<HTMLInputElement>) => void;
  isExpanding?: boolean;
  onSubmit?: (e?: FormEvent<HTMLFormElement>) => void;
  maxLength?: number;
};

export const Input = ({
  name,
  error,
  children,
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
    className: `input${error ? ' input--error' : ''}${isExpanding ? ' input--resizable' : ''}`,
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
      {children}
      {isExpanding ? (
        <Textarea
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
