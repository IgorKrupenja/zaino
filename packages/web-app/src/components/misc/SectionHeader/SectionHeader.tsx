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

type TitleProps = {
  className?: string;
  children: ReactNode;
};

const Title = ({ children, className }: TitleProps) => {
  return <h2 className={`section-header__title${getClassString(className)}`}>{children}</h2>;
};

SectionHeader.Title = Title;
