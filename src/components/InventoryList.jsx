import React from 'react';
import { connect } from 'react-redux';
import InventoryListItem from './InventoryListItem';

const InventoryList = ({ items }) => (
  <section>
    <h2>Inventory</h2>
    {items.length === 0 ? (
      <p>No items in inventory</p>
    ) : (
      items.map(item => <InventoryListItem key={item.id} {...item} />)
    )}
  </section>
);

const mapStateToProps = state => {
  // todo this would need changes after filters reducer is added
  return { items: state };
};

export default connect(mapStateToProps)(InventoryList);
