import { ReactNode } from 'react';
import { getClassString } from '../../../../utils';
import './style.scss';

type RowProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Wrapper component to arrange children in a row: horizontally from left to right.
 */
export const Row = ({ className, children }: RowProps) => {
  return <div className={getClassString('row-wrapper', className)}>{children}</div>;
};
