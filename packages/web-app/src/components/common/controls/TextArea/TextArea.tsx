import './TextArea.scss';

import { ChangeEvent, ReactNode } from 'react';

import { getClassString } from '../../../../utils';

type TextAreaProps = {
  children?: ReactNode;
  className?: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string | undefined;
};

export const TextArea = ({ name, className, children, ...rest }: TextAreaProps) => {
  return (
    <>
      {children}
      {/* id needed to focus textarea on label click */}
      <textarea
        className={getClassString('textarea', { extraClassNames: className })}
        id={name}
        name={name}
        onFocus={(e) => {
          // Puts cursor at the end on focus
          const value = e.target.value;
          e.target.value = '';
          e.target.value = value;
        }}
        {...rest}
      />
    </>
  );
};
