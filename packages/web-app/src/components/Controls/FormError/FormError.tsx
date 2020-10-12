import React, { ReactNode } from 'react';
import './style.scss';

type FormErrorProps = {
  children?: ReactNode;
};

export const FormError = ({ children }: FormErrorProps) => {
  return <div className="form-error">{children}</div>
};
