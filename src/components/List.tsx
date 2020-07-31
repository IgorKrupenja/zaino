import React from 'react';
import { RootState } from '../store/store';

type ListProps = {
  items: React.ReactChild[];
  title: string;
  children?: React.ReactChild;
};

const List = ({ items, title, children }: ListProps) => (
  <section className={`list list--${title}`}>
    <h2>{title.toUpperCase()}</h2>
    {items.length === 0 ? <p>No items in {title}</p> : items}
    {children}
  </section>
);

export default List;
