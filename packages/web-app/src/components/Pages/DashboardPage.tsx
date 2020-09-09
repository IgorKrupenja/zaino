import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { RootState } from '../../state/store';
import Filters from '../Dashboard/Filters';
import Inventory from '../Dashboard/Inventory';
import Pack from '../Dashboard/Pack';
import AddItemModal from '../ItemModal/AddItemModal';
import EditItemModal from '../ItemModal/EditItemModal';
import Loader from '../misc/Loader';

const DashboardPage = () => {
  const isLoading = useSelector((state: RootState) => state.dataLoader.isLoading);

  document.title = 'Dashboard | Zaino';

  return (
    <>
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

      {/* routes for item modals specific to Dashboard page */}
      <Route path="/dashboard/edit/:id" component={EditItemModal} />
      <Route path="/dashboard/add" component={AddItemModal} />
    </>
  );
};

export default DashboardPage;
