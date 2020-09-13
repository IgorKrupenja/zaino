import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { RootState } from '../../../state/store';
import { DashboardFilters } from '../../Dashboard/DashboardFilters';
import Inventory from '../../Dashboard/Inventory';
import Pack from '../../Dashboard/Pack';
import { Stack } from '../../Dashboard/Stack';
import AddItemModal from '../../ItemModal/AddItemModal';
import EditItemModal from '../../ItemModal/EditItemModal';
import { Loader } from '../../misc/Loader';
import './style.scss';

export const DashboardPage = () => {
  const isLoading = useSelector((state: RootState) => state.dataLoader.isLoading);

  document.title = 'Dashboard | Zaino';

  return (
    <>
      <main className="dashboard-page">
        <DashboardFilters />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Stack>
              <Inventory />
            </Stack>
            <Stack>
              <Pack />
            </Stack>
          </>
        )}
      </main>

      {/* routes for item modals specific to Dashboard page */}
      <Route path="/dashboard/edit/:id" component={EditItemModal} />
      <Route path="/dashboard/add" component={AddItemModal} />
    </>
  );
};
