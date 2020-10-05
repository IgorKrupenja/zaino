import React, { ReactNode } from 'react';
import './style.scss';

type ListProps = {
  children: ReactNode;
};

/**
 * List component, currently used only on Labels page.
 * But potentially re-usable, if e.g. Category editor is implemented in a similar fashion.
 */
export const List = ({ children }: ListProps) => {
  return <section className="list">{children}</section>;
};

/**
 * Sub-component to style empty list when there are no (filtered) labels.
 */
const Empty = ({ children }: ListProps) => {
  return <section className="list--empty">{children}</section>;
};

List.Empty = Empty;
