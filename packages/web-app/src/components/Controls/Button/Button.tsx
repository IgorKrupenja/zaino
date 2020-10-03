import React, { forwardRef, ReactNode } from 'react';
import { getClassString } from '../../../utils/getClassString';
import './style.scss';

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  submit?: boolean;
  className: string;
  disabled?: boolean;
  children: ReactNode;
};

// forwardRef needed to support Button as Popover's target
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, submit, ...rest }: ButtonProps, ref) => {
    return (
      <button
        ref={ref}
        className={`button${getClassString(className)}`}
        type={submit ? 'submit' : 'button'}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
