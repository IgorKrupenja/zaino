import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { RootState } from '../../state/store';
import Filters from '../Dashboard/Filters';
import Inventory from '../Dashboard/Inventory';
import Pack from '../Dashboard/Pack';
import Header from '../Header/Header';
import AddItemModal from '../ItemModal/AddItemModal';
import EditItemModal from '../ItemModal/EditItemModal';
import Loader from '../misc/Loader';

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

      {/* specific routes for item modals specific to Dashboard page */}
      <Route path="/dashboard/edit/:id" component={EditItemModal} />
      <Route path="/dashboard/add" component={AddItemModal} />
    </>
  );
};

export default DashboardPage;