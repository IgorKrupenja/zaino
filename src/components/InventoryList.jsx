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
  return { items: state.items };
};

export default connect(mapStateToProps)(InventoryList);
