import React, { ReactNode } from 'react';
import './style.scss';

type StackProps = {
  // className: string;
  children: ReactNode;
};

/**
 * Component used to apply styles.
 */
export const Stack = ({ children }: StackProps) => {
  return <section className="stack">{children}</section>;
};
