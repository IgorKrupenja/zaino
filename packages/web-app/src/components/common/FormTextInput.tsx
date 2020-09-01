import React, { ChangeEvent } from 'react';

type TextFormInputProps = {
  name?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorText: string;
};

const FormTextInput = ({ name, onChange, errorText: error }: TextFormInputProps) => (
  <>
    <input
      type="text"
      name="name"
      placeholder="Name"
      className={`text-input ${error && 'text-input__error'}`}
      value={name}
      onChange={onChange}
    />
    {error && <span>{error}</span>}
  </>
);

export default FormTextInput;
