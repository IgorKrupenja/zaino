import React, { ReactNode } from 'react';
import './style.scss';

type StackProps = {
  className: string;
  children: ReactNode;
};

/**
 * Component used to apply styles
 */
export const Stack = ({ className, children }: StackProps) => {
  return <section className={`stack ${className}`}>{children}</section>;
};
