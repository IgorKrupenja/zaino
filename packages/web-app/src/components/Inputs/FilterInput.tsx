import React, { ChangeEvent } from 'react';

type TextFilterInputProps = {
  // todo rename to onChange
  onTextChange: (text: string) => void;
  // todo rename to value
  text: string;
};

const FilterInput = ({ onTextChange, text }: TextFilterInputProps) => {
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

export default FilterInput;
