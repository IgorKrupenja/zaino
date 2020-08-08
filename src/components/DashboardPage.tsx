import React from 'react';
import ListFilters from './Filters/ListFilters';
import AddItemModal from './ItemModal/AddItemModal';
import EditItemModal from './ItemModal/EditItemModal';
import InventoryList from './List/InventoryList';
import PackList from './List/PackList';

const DashboardPage = () => (
  <div className="dashboard">
    <ListFilters />
    <InventoryList />
    <PackList />
    <AddItemModal />
    <EditItemModal />
  </div>
);

export default DashboardPage;
