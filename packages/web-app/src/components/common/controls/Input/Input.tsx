import './Input.scss';

import { ChangeEvent } from 'react';

import { getClassString } from '../../../../utils';

type InputProps = {
  autoFocus?: boolean;
  className?: string;
  clearError?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  maxLength?: number;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  value: string | number;
  variant?: 'search';
};

export const Input = ({
  className,
  name,
  error,
  onChange,
  clearError,
  variant,
  ...rest
}: InputProps) => {
  const props = {
    className: getClassString('input' + (error ? ' input--error' : ''), {
      extraClassNames: className,
      variant,
    }),
    // id needed to focus input on label click
    id: name,
    name,
    ...rest,
  };

  return (
    <input
      type="text"
      {...props}
      onChange={(e) => {
        clearError && clearError(e);
        onChange && onChange(e);
      }}
    />
  );
};
