import './FormLabel.scss';

import { ReactNode } from 'react';

import { getClassString } from '../../../../utils';

type FormLabelProps = {
  children: ReactNode;
  className?: string;
  htmlFor: string;
};

export const FormLabel = ({ className, children, ...rest }: FormLabelProps) => {
  return (
    <label className={getClassString('form-label', { extraClassNames: className })} {...rest}>
      {children}
    </label>
  );
};
