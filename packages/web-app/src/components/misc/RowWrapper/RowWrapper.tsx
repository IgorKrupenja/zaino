import React, { ReactNode } from 'react';
import { getClassString } from '../../../utils/getClassString';
import './style.scss';

type RowWrapperProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Wrapper component to arrange children in a row: horizontally from left to right.
 */
export const RowWrapper = ({ className, children }: RowWrapperProps) => {
  return <div className={`row-wrapper${getClassString(className)}`}>{children}</div>;
};
