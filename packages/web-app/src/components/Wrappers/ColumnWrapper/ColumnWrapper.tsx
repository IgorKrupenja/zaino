import React, { ReactNode } from 'react';
import { getClassString } from '../../../utils/getClassString';
import './style.scss';

type ColumnWrapperProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Wrapper component to arrange children in a column: vertically from top to bottom.
 */
export const ColumnWrapper = ({ className, children }: ColumnWrapperProps) => {
  return <div className={`column-wrapper${getClassString(className)}`}>{children}</div>;
};
