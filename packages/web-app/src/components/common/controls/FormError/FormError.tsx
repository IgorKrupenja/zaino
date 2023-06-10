import './FormError.scss';

import { ReactNode } from 'react';

import { getClassString } from '../../../../utils';

type FormErrorProps = {
  children?: ReactNode;
  className?: string;
};

export const FormError = ({ className, children }: FormErrorProps) => {
  return (
    <div className={getClassString('form-error', { extraClassNames: className })}>{children}</div>
  );
};
