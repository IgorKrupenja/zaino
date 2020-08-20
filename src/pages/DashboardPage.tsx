import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/common/Header';
import Filters from '../components/DashboardFilters/DashboardFilters';
import Inventory from '../components/DashboardStacks/Inventory';
import Pack from '../components/DashboardStacks/Pack';
import AddItemModal from '../components/ItemModal/AddItemModal';
import EditItemModal from '../components/ItemModal/EditItemModal';

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
