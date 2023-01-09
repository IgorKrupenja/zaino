import './style.scss';

import { ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import ReactExpandingTextarea from 'react-expanding-textarea';

import { getClassString } from '../../../../utils';

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
    
    className: getClassString('expanding-input' + (error ? ' input--error' : ''), {
      extraClassNames: className,
    }),
    // id needed to focus input on label click
id: name,
    name,
    value,
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
      autoFocus
      onChange={(e) => {
        clearError && clearError();
        onChange && onChange(e);
      }}
      onFocus={(e) => {
        // puts cursor at the end on focus
        const value = e.target.value;
        e.target.value = '';
        e.target.value = value;
      }}
      onKeyPress={handleKeyPress}
      value={String(value)}
    />
  );
};
