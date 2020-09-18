import React, { ReactNode } from 'react';
import './style.scss';

type FormLabelProps = {
  htmlFor: string;
  children: ReactNode;
};

export const FormLabel = ({ htmlFor, children }: FormLabelProps) => {
  return (
    <label htmlFor={htmlFor} className="form-label">
      {children}
    </label>
  );
};
