import { ReactNode } from 'react';
import { getClassString } from '../../../../utils';
import './SectionHeader.scss';

type SectionHeaderProps = {
  className?: string;
  variant?: 'large-margin';
  children: ReactNode;
};

export const SectionHeader = ({ className, children, variant }: SectionHeaderProps) => {
  return (
    <header
      className={getClassString('section-header', {
        extraClassNames: className,
        variant: variant,
      })}
    >
      {children}
    </header>
  );
};

const Title = ({ children, className }: SectionHeaderProps) => {
  return (
    <h2 className={getClassString('section-header__title', { extraClassNames: className })}>
      {children}
    </h2>
  );
};

const Content = ({ children }: SectionHeaderProps) => {
  return <div className="section-header__content">{children}</div>;
};

SectionHeader.Title = Title;
SectionHeader.Content = Content;
