import { ReactNode } from 'react';
import { getClassString } from '../../../../utils';
import './style.scss';

type FormErrorProps = {
  children?: ReactNode;
  className?: string;
};

export const FormError = ({ className, children }: FormErrorProps) => {
  return (
    <div className={getClassString('form-error', { extraClassNames: className })}>{children}</div>
  );
};
