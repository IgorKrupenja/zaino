import React from 'react';
import InventoryList from './InventoryList';
import AddItemModal from './AddItemModal';
import PackList from './PackList';
import EditItemModal from './EditItemModal';

const DashboardPage = () => (
  <>
    <InventoryList />
    <AddItemModal />
    <EditItemModal />
    <PackList />
  </>
);

export default DashboardPage;
