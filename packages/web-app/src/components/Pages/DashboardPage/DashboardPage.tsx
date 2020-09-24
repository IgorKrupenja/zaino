import React from 'react';
import { useSelector } from 'react-redux';
import { DashboardRoutes } from '../../../routes/DashboardRoutes';
import { RootState } from '../../../state/store';
import { DashboardFilters } from '../../Dashboard/DashboardFilters';
import { Inventory } from '../../Dashboard/Inventory/';
import { Pack } from '../../Dashboard/Pack/';
import { Stack } from '../../Dashboard/Stack';
import { Loader } from '../../Misc/Loader';
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
            <div className="dashboard-page__stacks">
              <Stack className="stack--left">
                <Inventory />
              </Stack>
              <Stack className="stack--right">
                <Pack />
              </Stack>
            </div>
          </>
        )}
      </main>

      {/* routes for item modals specific to Dashboard page */}
      <DashboardRoutes />
    </>
  );
};
