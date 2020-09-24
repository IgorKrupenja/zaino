import React, { ReactNode } from 'react';
import { getClassString } from '../../../utils/getClassString';
import './style.scss';

type ModalHeaderProps = {
  className?: string;
  children: ReactNode;
};

export const SectionHeader = ({ className, children }: ModalHeaderProps) => {
  return <header className={`section-header${getClassString(className)}`}>{children}</header>;
};
