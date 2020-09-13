import React, { ReactNode } from 'react';
import './style.scss';

type HeaderLinkProps = {
  className?: string;
  activeClassName?: string;
  children: ReactNode;
};

export const HeaderLink = ({ children }: HeaderLinkProps) => {
  return <>{children}</>;
};
