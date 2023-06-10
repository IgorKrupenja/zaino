import './ExpandingInput.scss';

import { ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import ReactExpandingTextarea from 'react-expanding-textarea';

import { getClassString } from '../../../../utils';

type ExpandingInputProps = {
  className?: string;
  clearError?: () => void;
  error?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (e?: FormEvent<HTMLFormElement>) => void;
  value: string;
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
  const props = {
    className: getClassString('expanding-input' + (error ? ' expanding-input--error' : ''), {
      extraClassNames: className,
    }),
    // id needed to focus input on label click
    id: name,
    name,
    value,
    ...rest,
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on enter instead of inserting a line break
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit && onSubmit();
    }
  };

  return (
    <ReactExpandingTextarea
      {...props}
      autoFocus
      onChange={(e) => {
        clearError && clearError();
        onChange && onChange(e);
      }}
      onFocus={(e) => {
        // Puts cursor at the end on focus
        const value = e.target.value;
        e.target.value = '';
        e.target.value = value;
      }}
      onKeyPress={handleKeyPress}
      value={String(value)}
    />
  );
};
