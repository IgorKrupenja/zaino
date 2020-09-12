import React, { ChangeEvent } from 'react';
import './style.scss';

type TextAreaProps = {
  title: string;
  value: string | undefined;
  name: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextArea = ({ name, title, value, onChange }: TextAreaProps) => {
  return (
    <label>
      {title}
      <textarea
        // placeholder="Add notes here"
        name={name}
        className="textarea"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
