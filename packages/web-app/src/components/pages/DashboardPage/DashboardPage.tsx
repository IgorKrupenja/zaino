import './DashboardPage.scss';

import { useSelector } from 'react-redux';

import { useTitle } from '../../../hooks';
import { DashboardRoutes } from '../../../routes';
import { RootState } from '../../../state/store';
import { Header } from '../../common/header/Header';
import { Loader } from '../../common/misc/Loader';
import { Inventory } from '../../dashboard/Inventory';
import { ItemFilters } from '../../dashboard/ItemFilters';
import { Pack } from '../../dashboard/Pack';

export const DashboardPage = () => {
  const isLoading = useSelector((state: RootState) => state.demoData.isLoading);
  useTitle('Dashboard | Zaino');

  return (
    <>
      <Header />
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

      {/* Routes for item modals specific to Dashboard page */}
      <DashboardRoutes />
    </>
  );
};
