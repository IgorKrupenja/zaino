import React, { ReactNode } from 'react';
import './style.scss';

type FiltersWrapperProps = {
  children: ReactNode;
};

export const FiltersWrapper = ({ children }: FiltersWrapperProps) => {
  return <section className="filters-wrapper">{children}</section>;
};
