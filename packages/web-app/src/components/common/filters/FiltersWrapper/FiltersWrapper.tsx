import './style.scss';

import { ReactNode } from 'react';

type FiltersWrapperProps = {
  children: ReactNode;
};

/**
 * Wrapper with special styling for Filter components.
 * Currently used on Dashboard and Labels pages.
 */
export const FiltersWrapper = ({ children }: FiltersWrapperProps) => {
  return <section className="filters-wrapper">{children}</section>;
};
