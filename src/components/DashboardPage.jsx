import React from 'react';
import InventoryList from './InventoryList';
import AddItemPage from './AddItemPage';
import PackList from './PackList';
import EditItemPage from './EditItemPage';

const DashboardPage = () => (
  <>
    <InventoryList />
    <AddItemPage />
    <EditItemPage />
    <PackList />
  </>
);

export default DashboardPage;
