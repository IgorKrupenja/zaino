import React, { ReactNode } from 'react';
import { getClassString } from '../../../utils/getClassString';
import './style.scss';

type BulletWrapperProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Component that displays all children separated by a bullet point '•'.
 * Supports wrapping so the first element on a line does not display a bullet point.
 * Based on https://stackoverflow.com/a/41080934/7405507
 */
export const BulletWrapper = ({ children, className }: BulletWrapperProps) => {
  return <div className={getClassString('bullet-wrapper', className)}>{children}</div>;
};
