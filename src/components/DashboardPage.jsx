import React from 'react';
import { PackList, InventoryList } from './List';
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
