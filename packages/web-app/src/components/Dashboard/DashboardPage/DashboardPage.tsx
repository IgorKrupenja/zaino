import { useSelector } from 'react-redux';
import { useTitle } from '../../../hooks';
import { DashboardRoutes } from '../../../routes';
import { RootState } from '../../../state/store';
import { Loader } from '../../Common/Misc/Loader';
import { Header } from '../../Header/Header';
import { Inventory } from '../Inventory';
import { ItemFilters } from '../ItemFilters';
import { Pack } from '../Pack';
import './style.scss';

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

      {/* routes for item modals specific to Dashboard page */}
      <DashboardRoutes />
    </>
  );
};
