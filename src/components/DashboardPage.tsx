import React from 'react';
import ListFilters from './DashboardFilters/ListFilters';
import Inventory from './DashboardLists/Inventory';
import Pack from './DashboardLists/Pack';
import AddItemModal from './ItemModal/AddItemModal';
import EditItemModal from './ItemModal/EditItemModal';

const DashboardPage = () => {
  return (
    <main className="dashboard">
      <AddItemModal />
      <EditItemModal />
      <ListFilters />
      <Inventory />
      <Pack />
    </main>
  );
};

export default DashboardPage;
