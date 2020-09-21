import React, { ReactNode } from 'react';
import './style.scss';

type ModalHeaderProps = {
  className?: string;
  children: ReactNode;
};

export const SectionHeader = ({ className, children }: ModalHeaderProps) => {
  return (
    <header className={`section-header${className ? ` ${className}` : ''}`}>{children}</header>
  );
};
