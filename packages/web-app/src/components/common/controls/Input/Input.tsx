import './style.scss';

import { ChangeEvent } from 'react';

import { getClassString } from '../../../../utils';

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
    
    className: getClassString('input' + (error ? ' input--error' : ''), {
      extraClassNames: className,
    }),
    // id needed to focus input on label click
id: name,
    name,
    ...rest,
  };

  return (
    <input
      type="text"
      {...elementProps}
      onChange={(e) => {
        clearError && clearError(e);
        onChange && onChange(e);
      }}
    />
  );
};
