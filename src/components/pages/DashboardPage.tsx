import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../common/Header';
import Filters from '../DashboardFilters/DashboardFilters';
import Inventory from '../DashboardStacks/Inventory';
import Pack from '../DashboardStacks/Pack';
import AddItemModal from '../ItemModal/AddItemModal';
import EditItemModal from '../ItemModal/EditItemModal';

const DashboardPage = () => {
  return (
    <>
      <Header />
      <main className="dashboard">
        <Filters />
        <Inventory />
        <Pack />
      </main>

      <Route path="/dashboard/edit/:id" component={EditItemModal} />
      <Route path="/dashboard/add" component={AddItemModal} />
    </>
  );
};

export default DashboardPage;
