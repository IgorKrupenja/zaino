import './FiltersWrapper.scss';

import { ReactNode } from 'react';

type FiltersWrapperProps = {
  children: ReactNode;
};

export const FiltersWrapper = ({ children }: FiltersWrapperProps) => {
  return <section className="filters-wrapper">{children}</section>;
};
