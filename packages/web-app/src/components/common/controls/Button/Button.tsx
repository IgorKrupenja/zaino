import { forwardRef, ReactNode } from 'react';
import { getClassString } from '../../../../utils';
import './Button.scss';

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  submit?: boolean;
  // todo check if used at all
  className?: string;
  // todo research why link has to be button???
  variant?: 'primary' | 'secondary' | 'tertiary' | 'transparent' | 'link';
  // todo also size
  disabled?: boolean;
  children: ReactNode;
};

// forwardRef needed to support Button as Popover's target
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, submit, variant, ...rest }: ButtonProps, ref) => {
    return (
      <button
        ref={ref}
        className={getClassString('button', {
          extraClassNames: className,
          variant: variant ?? 'primary',
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
