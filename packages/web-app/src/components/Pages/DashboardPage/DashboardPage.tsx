import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from '../../../state/store';
import { DashboardFilters } from '../../Dashboard/DashboardFilters';
import { Inventory } from '../../Dashboard/Inventory/';
import { Pack } from '../../Dashboard/Pack/';
import { Stack } from '../../Dashboard/Stack';
import { AddItem } from '../../ItemModal/AddItem/';
import { EditItem } from '../../ItemModal/EditItem/';
import { Loader } from '../../misc/Loader';
import './style.scss';

type Match = { params: { id: string } };

export const DashboardPage = () => {
  const isLoading = useSelector((state: RootState) => state.dataLoader.isLoading);
  const items = useSelector((state: RootState) => state.items);

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
      <Route path="/dashboard/add" component={AddItem} />
      <Route
        path="/dashboard/edit/:id"
        render={({ match }: { match: Match }) => {
          // show EditItem if id is valid
          if (items.find(item => item.id === match.params.id)) {
            return <EditItem />;
          }
          // redirect to Dashboard if item id is invalid
          return <Redirect to="/dashboard" />;
        }}
      />
    </>
  );
};
