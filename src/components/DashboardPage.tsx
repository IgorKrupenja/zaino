import React from 'react';
import AddItemModal from './AddItemModal';
import EditItemModal from './EditItemModal';
import InventoryList from './InventoryList';
import PackList from './PackList';
import ListFilters from './ListFilters';

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
