import './style.scss';

import { ReactNode } from 'react';

import { getClassString } from '../../../../utils';

type BulletRowProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Component that displays all children separated by a bullet point '•'.
 * Supports wrapping so the first element on a line does not display a bullet point.
 * Based on https://stackoverflow.com/a/41080934/7405507
 */
export const BulletRow = ({ children, className }: BulletRowProps) => {
  return (
    // todo renaem class
    <div className={getClassString('bullet-wrapper', { extraClassNames: className })}>
      {children}
    </div>
  );
};
