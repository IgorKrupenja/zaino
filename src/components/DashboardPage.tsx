import React from 'react';
import ListFilters from './DashboardFilters/ListFilters';
import Inventory from './DashboardStacks/Inventory';
import Pack from './DashboardStacks/Pack';
import AddItemModal from './ItemModal/AddItemModal';
import EditItemModal from './ItemModal/EditItemModal';

const DashboardPage = () => {
  return (
    <main className="dashboard">
      {/* Modals are hidden unless the route is matching */}
      <AddItemModal />
      <EditItemModal />
      <ListFilters />
      <Inventory />
      <Pack />
    </main>
  );
};

export default DashboardPage;
