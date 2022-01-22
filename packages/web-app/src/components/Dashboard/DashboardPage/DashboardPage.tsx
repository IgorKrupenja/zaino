import React from 'react';
import { useSelector } from 'react-redux';
import { DashboardRoutes } from '../../../routes/DashboardRoutes';
import { RootState } from '../../../state/store';
import { Inventory } from '../Inventory';
import { ItemFilters } from '../ItemFilters';
import { Pack } from '../Pack';
import { Header } from '../../Header/Header';
import { Loader } from '../../Common/Misc/Loader';
import './style.scss';

export const DashboardPage = () => {
  const isLoading = useSelector((state: RootState) => state.dataLoader.isLoading);
  document.title = 'Dashboard | Zaino';

  return (
    <>
      <Header />
      {/* "--loading" needed for Loader to display correctly when loading demo data */}
      <main className={`dashboard-page ${isLoading ? 'dashboard-page--loading' : ''}`}>
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
