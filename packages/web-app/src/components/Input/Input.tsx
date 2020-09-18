import React, { ChangeEvent, ReactNode } from 'react';
import './style.scss';

type InputProps = {
  value: string | number;
  name?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoFocus?: boolean;
  children?: ReactNode;
  onFocus?: () => void;
  containerClassName?: string;
};

export const Input = ({
  value,
  name,
  onChange,
  error,
  autoFocus,
  children,
  onFocus,
  containerClassName,
}: InputProps) => {
  return (
    <div className={`input__container${containerClassName ? ` ${containerClassName}` : ''}`}>
      {children}
      <input
        type="text"
        // id needed to focus input on label click
        id={name}
        name={name}
        className={`input ${error ? 'input--error' : ''}`}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        onFocus={onFocus}
        // on
      />
      {/* todo apply class mod instead */}
      {error && <span className="input__error-message">{error}</span>}
    </div>
  );
};
