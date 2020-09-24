import React, { ReactNode } from 'react';
import './style.scss';

type FormLabelProps = {
  htmlFor: string;
  children: ReactNode;
};

export const FormLabel = ({ children, ...rest }: FormLabelProps) => {
  return (
    <label className="form-label" {...rest}>
      {children}
    </label>
  );
};
