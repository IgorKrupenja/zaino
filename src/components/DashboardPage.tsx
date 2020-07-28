import React from 'react';
import PackList from './PackList';
import InventoryList from './InventoryList';
import AddItemModal from './AddItemModal';
import EditItemModal from './EditItemModal';

const DashboardPage = () => (
  <div className="dashboard">
    <InventoryList />
    <AddItemModal />
    <EditItemModal />
    <PackList />
  </div>
);

export default DashboardPage;
