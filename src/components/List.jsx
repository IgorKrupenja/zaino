import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import InventoryListItem from './InventoryListItem';
import { InventoryListItem, PackListItem } from './ListItem';

const List = ({ items, title, children }) => {
  return (
    <section className={`list list--${title}`}>
      <h2>{title.toUpperCase()}</h2>
      {items.length === 0 ? <p>No items in {title}</p> : items}
      {children}
    </section>
  );
};

export const InventoryList = () => (
  <List
    items={useSelector(state => state.items).map(item => (
      <InventoryListItem key={item.id} {...item} />
    ))}
    title="inventory"
  >
    <Link to="/add">Add item</Link>
  </List>
);

export const PackList = () => (
  <List
    items={useSelector(state => state.items)
      .filter(item => item.quantityInPack > 0)
      .map(item => (
        <PackListItem key={item.id} {...item} />
      ))}
    title="pack"
  />
);
