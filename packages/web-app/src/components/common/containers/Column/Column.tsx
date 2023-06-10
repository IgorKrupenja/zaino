import './Column.scss';

import { ReactNode } from 'react';

import { getClassString } from '../../../../utils';

type ColumnProps = {
  children: ReactNode;
  className?: string;
};

export const Column = ({ className, children }: ColumnProps) => {
  return <div className={getClassString('column', { extraClassNames: className })}>{children}</div>;
};
