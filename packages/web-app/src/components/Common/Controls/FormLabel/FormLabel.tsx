import { ReactNode } from 'react';
import { getClassString } from '../../../../utils';
import './style.scss';

type FormLabelProps = {
  htmlFor: string;
  children: ReactNode;
  className?: string;
};

export const FormLabel = ({ className, children, ...rest }: FormLabelProps) => {
  return (
    <label className={getClassString('form-label', className)} {...rest}>
      {children}
    </label>
  );
};
