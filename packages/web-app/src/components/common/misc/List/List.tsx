import { ReactNode } from 'react';
import { getClassString } from '../../../../utils';
import './List.scss';

type ListProps = {
  children: ReactNode;
  variant?: 'top-border';
};

export const List = ({ children }: ListProps) => {
  return <section className="list">{children}</section>;
};

const Empty = ({ children, variant }: ListProps) => {
  return (
    <section className={getClassString('list--empty', { variant: variant })}>{children}</section>
  );
};

List.Empty = Empty;
