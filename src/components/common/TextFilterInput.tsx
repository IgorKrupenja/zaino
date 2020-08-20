import React, { ChangeEvent } from 'react';

type TextFilterInputProps = {
  onTextChange: (text: string) => void;
  text: string;
};

const TextFilterInput = ({ onTextChange, text }: TextFilterInputProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    onTextChange(e.target.value);
  };

  return (
    <label>
      Name
      <input
        type="text"
        placeholder="Search"
        className="text-input"
        value={text}
        onChange={onChange}
      />
    </label>
  );
};

export default TextFilterInput;
