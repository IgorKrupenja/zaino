import React, { ChangeEvent } from 'react';

type InputProps = {
  title?: string;
  value: string | number;
  name?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoFocus?: boolean;
};

export const Input = ({ title, value, name, onChange, error, autoFocus }: InputProps) => {
  return (
    <label>
      {title}
      <input
        type="text"
        name={name ?? title?.toLowerCase()}
        // placeholder={name}
        className={`input ${error !== '' ? 'input__error' : ''}`}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
      />
      {/* todo apply class mod instead */}
      {error && <span>{error}</span>}
    </label>
  );
};
