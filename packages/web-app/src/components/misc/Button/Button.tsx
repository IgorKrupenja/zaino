import React, { forwardRef, ReactNode } from 'react';
import './style.scss';

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: ReactNode;
  submit?: boolean;
  className?: string;
  disabled?: boolean;
};

// forwardRef needed to support Button as Popover's target
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, onClick, submit, disabled }: ButtonProps, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`button${className ? ` ${className}` : ''}`}
        onClick={onClick}
        type={submit ? 'submit' : 'button'}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
