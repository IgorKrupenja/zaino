import React, { ReactNode } from 'react';
import { getClassString } from '../../../../utils/getClassString';
import './style.scss';

type ColumnProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Wrapper component to arrange children in a column: vertically from top to bottom.
 */
export const Column = ({ className, children }: ColumnProps) => {
  return <div className={getClassString('column-wrapper', className)}>{children}</div>;
};
