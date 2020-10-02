import React from 'react';
import { useSelector } from 'react-redux';
import { DashboardRoutes } from '../../../routes/DashboardRoutes';
import { RootState } from '../../../state/store';
import { Inventory } from '../../Dashboard/Inventory';
import { ItemFilters } from '../../Dashboard/ItemFilters';
import { Pack } from '../../Dashboard/Pack';
import { Loader } from '../../Misc/Loader';
import './style.scss';

export const DashboardPage = () => {
  const isLoading = useSelector((state: RootState) => state.dataLoader.isLoading);
  document.title = 'Dashboard | Zaino';

  return (
    <>
      <main className="dashboard-page">
        <ItemFilters />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="dashboard-page__stacks">
            <Inventory />
            <Pack />
          </div>
        )}
      </main>

      {/* routes for item modals specific to Dashboard page */}
      <DashboardRoutes />
    </>
  );
};
