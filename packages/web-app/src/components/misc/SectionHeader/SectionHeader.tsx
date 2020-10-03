import React, { ReactNode } from 'react';
import { getClassString } from '../../../utils/getClassString';
import './style.scss';

type SectionHeaderProps = {
  className?: string;
  children: ReactNode;
};

export const SectionHeader = ({ className, children }: SectionHeaderProps) => {
  return <header className={`section-header${getClassString(className)}`}>{children}</header>;
};

const Title = ({ children, className }: SectionHeaderProps) => {
  return <h2 className={`section-header__title${getClassString(className)}`}>{children}</h2>;
};

const Content = ({ children }: SectionHeaderProps) => {
  return <div className="section-header__content">{children}</div>;
};

SectionHeader.Title = Title;
SectionHeader.Content = Content;
