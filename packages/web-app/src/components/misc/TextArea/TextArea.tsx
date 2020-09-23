import React, { ChangeEvent, ReactNode } from 'react';
import './style.scss';

type TextAreaProps = {
  value: string | undefined;
  name: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  children?: ReactNode;
};

export const TextArea = ({ name, value, onChange, children }: TextAreaProps) => {
  return (
    <div className="textarea__container">
      {children}
      {/* id needed to focus textarea on label click */}
      <textarea id={name} name={name} className="textarea" value={value} onChange={onChange} />
    </div>
  );
};
