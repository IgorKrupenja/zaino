import React, { ChangeEvent } from 'react';

type TextFilterInputProps = {
  onTextChange: (text: string) => void;
  text: string;
};

const FilterTextInput = ({ onTextChange, text }: TextFilterInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        onChange={handleChange}
      />
    </label>
  );
};

export default FilterTextInput;
