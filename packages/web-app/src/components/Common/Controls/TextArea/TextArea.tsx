import React, { ChangeEvent, ReactNode } from 'react';
import { getClassString } from '../../../../utils/getClassString';
import './style.scss';

type TextAreaProps = {
  value: string | undefined;
  name: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  children?: ReactNode;
};

export const TextArea = ({ name, className, children, ...rest }: TextAreaProps) => {
  return (
    <>
      {children}
      {/* id needed to focus textarea on label click */}
      <textarea
        id={name}
        name={name}
        className={getClassString('textarea', className)}
        onFocus={e => {
          // puts cursor at the end on focus
          const value = e.target.value;
          e.target.value = '';
          e.target.value = value;
        }}
        {...rest}
      />
    </>
  );
};
