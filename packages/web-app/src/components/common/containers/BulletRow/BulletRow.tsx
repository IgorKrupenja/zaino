import './BulletRow.scss';

import { ReactNode } from 'react';

import { getClassString } from '../../../../utils';

type BulletRowProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Component that displays all children separated by a bullet point '•'.
 * Supports wrapping so the first element on a line does not display a bullet point.
 * Based on https://stackoverflow.com/a/41080934/7405507
 */
// TODO: Consider making it a compound component with BulletRow.Item
export const BulletRow = ({ children, className }: BulletRowProps) => {
  return (
    <div className={getClassString('bullet-row', { extraClassNames: className })}>{children}</div>
  );
};
