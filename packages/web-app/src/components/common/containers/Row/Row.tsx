import './Row.scss';

import { ReactNode } from 'react';

import { getClassString } from '../../../../utils';

type RowProps = {
  children: ReactNode;
  className?: string;
  variant?: 'full-width';
};

export const Row = ({ children, className, variant }: RowProps) => {
  return (
    <div className={getClassString('row', { extraClassNames: className, variant })}>{children}</div>
  );
};
