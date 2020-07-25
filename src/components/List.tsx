import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { InventoryListItem, PackListItem } from './ListItem';
import { Item } from '../types/types';
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

export const InventoryList = () => (
  <List
    items={useSelector((state: RootState) => state.items).map((item: Item) => (
      <InventoryListItem key={item.id} {...item} />
    ))}
    title="inventory"
  >
    <Link to="/add">Add item</Link>
  </List>
);

export const PackList = () => (
  <List
    // reduce is more efficient than .filter() + .map() as it traverses the array only once
    items={useSelector((state: RootState) => state.items).reduce(
      (accumulator: React.ReactChild[], currentItem: Item) => {
        if (currentItem.quantityInPack > 0) {
          accumulator.push(<PackListItem key={currentItem.id} {...currentItem} />);
        }
        return accumulator;
      },
      []
    )}
    title="pack"
  />
);
