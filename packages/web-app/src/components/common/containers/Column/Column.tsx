import './style.scss';

import { ReactNode } from 'react';

import { getClassString } from '../../../../utils';

type ColumnProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Wrapper component to arrange children in a column: vertically from top to bottom.
 */
export const Column = ({ className, children }: ColumnProps) => {
  return (
    <div className={getClassString('column-wrapper', { extraClassNames: className })}>
      {children}
    </div>
  );
};
