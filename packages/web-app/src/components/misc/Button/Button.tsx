import React, { forwardRef, ReactNode } from 'react';
import { getClassString } from '../../../utils/getClassString';
import './style.scss';

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  submit?: boolean;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
};

// forwardRef needed to support Button as Popover's target
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, onClick, submit, disabled }: ButtonProps, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`button${getClassString(className)}`}
        onClick={onClick}
        type={submit ? 'submit' : 'button'}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
