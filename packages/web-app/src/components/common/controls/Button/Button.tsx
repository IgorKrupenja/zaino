import './Button.scss';

import { forwardRef, ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { getClassString } from '../../../../utils';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  linkTo?: string;
  navLinkTo?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: 'small' | 'medium' | 'large';
  submit?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'transparent' | 'underline';
};

// forwardRef needed to support Button as Popover's target
export const Button = forwardRef<HTMLAnchorElement & HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      linkTo,
      navLinkTo,
      submit,
      variant = 'primary',
      size = 'large',
      ...rest
    }: ButtonProps,
    ref
  ) => {
    const classNames = getClassString('button', {
      extraClassNames: className,
      variant: [variant, size],
    });

    return linkTo ? (
      <Link className={classNames} ref={ref} to={linkTo}>
        {children}
      </Link>
    ) : navLinkTo ? (
      <NavLink
        className={({ isActive }) =>
          `${classNames} ${isActive ? `button--${variant}--active` : ''}`
        }
        ref={ref}
        to={navLinkTo}
      >
        {children}
      </NavLink>
    ) : (
      <button className={classNames} ref={ref} type={submit ? 'submit' : 'button'} {...rest}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
