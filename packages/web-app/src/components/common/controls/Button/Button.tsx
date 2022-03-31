import { forwardRef, ReactNode } from 'react';
import { getClassString } from '../../../../utils';
import './Button.scss';

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  submit?: boolean;
  className?: string;
  // todo research why link has to be button???
  variant?: 'primary' | 'secondary' | 'tertiary' | 'transparent' | 'underline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: ReactNode;
};

// forwardRef needed to support Button as Popover's target
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, submit, variant = 'primary', size = 'large', ...rest }: ButtonProps,
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={getClassString('button', {
          extraClassNames: className,
          variant: [variant, size],
        })}
        type={submit ? 'submit' : 'button'}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
