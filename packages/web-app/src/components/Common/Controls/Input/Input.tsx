import React, { ChangeEvent } from 'react';
import { getClassString } from '../../../../utils/getClassString';
import './style.scss';

type InputProps = {
  className?: string;
  value: string | number;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  autoFocus?: boolean;
  clearError?: (e: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  placeholder?: string;
};

export const Input = ({ className, name, error, onChange, clearError, ...rest }: InputProps) => {
  const elementProps = {
    // id needed to focus input on label click
    id: name,
    name,
    className: getClassString('input' + (error ? ' input--error' : ''), className),
    ...rest,
  };

  return (
    <input
      type="text"
      {...elementProps}
      onChange={e => {
        clearError && clearError(e);
        onChange && onChange(e);
      }}
    />
  );
};
