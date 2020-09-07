import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { RootState } from '../../state/store';
import Header from '../common/Header';
import Loader from '../common/Loader';
import Filters from '../DashboardFilters/DashboardFilters';
import Inventory from '../DashboardStacks/Inventory';
import Pack from '../DashboardStacks/Pack';
import AddItemModal from '../ItemModal/AddItemModal';
import EditItemModal from '../ItemModal/EditItemModal';

const DashboardPage = () => {
  const isLoading = useSelector((state: RootState) => state.dataLoader.isLoading);

  return (
    <>
      <Header />
      <main className="dashboard">
        <Filters />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Inventory />
            <Pack />
          </>
        )}
      </main>

      <Route path="/dashboard/edit/:id" component={EditItemModal} />
      <Route path="/dashboard/add" component={AddItemModal} />
    </>
  );
};

export default DashboardPage;
