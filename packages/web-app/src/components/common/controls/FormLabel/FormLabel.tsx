import './style.scss';

import { ReactNode } from 'react';

import { getClassString } from '../../../../utils';

type FormLabelProps = {
  htmlFor: string;
  children: ReactNode;
  className?: string;
};

export const FormLabel = ({ className, children, ...rest }: FormLabelProps) => {
  return (
    <label className={getClassString('form-label', { extraClassNames: className })} {...rest}>
      {children}
    </label>
  );
};
