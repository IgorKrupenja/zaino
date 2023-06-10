import './Button.scss';

import { forwardRef, ReactNode } from 'react';

import { getClassString } from '../../../../utils';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  navLinkTo?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: 'small' | 'medium' | 'large';
  submit?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'transparent' | 'underline';
};

// forwardRef needed to support Button as Popover's target
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, submit, variant = 'primary', size = 'large', ...rest }: ButtonProps,
    ref
  ) => {
    return (
      <button
        className={getClassString('button', {
          extraClassNames: className,
          variant: [variant, size],
        })}
        ref={ref}
        type={submit ? 'submit' : 'button'}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
