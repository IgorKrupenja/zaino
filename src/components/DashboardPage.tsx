import React from 'react';
import ListFilters from './DashboardFilters/ListFilters';
import AddItemModal from './ItemModal/AddItemModal';
import EditItemModal from './ItemModal/EditItemModal';
import Inventory from './DashboardLists/Inventory';
import Pack from './DashboardLists/Pack';

const DashboardPage = () => {
  console.log('render dashboard');

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
