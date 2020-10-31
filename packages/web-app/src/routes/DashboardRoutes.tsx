import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { EditItem } from '../components/ItemModal/EditItem';
import { NewItem } from '../components/ItemModal/NewItem';
import { RootState } from '../state/store';

type MatchParams = {
  id: string;
};

/**
 * Provides routes specific to Dashboard page: Edit Item and New Item.
 */
export const DashboardRoutes = () => {
  const items = useSelector((state: RootState) => state.items);

  return (
    <>
      <Route path="/dashboard/new">
        <NewItem />
      </Route>
      <Route
        path="/dashboard/edit/:id"
        render={({ match }: RouteComponentProps<MatchParams>) => {
          const item = items.find(item => item.id === match.params.id);
          // show EditItem if id is valid
          if (item) {
            return <EditItem item={item} />;
          }
          // redirect to Dashboard if item id is invalid
          return <Redirect to="/dashboard" />;
        }}
      />
    </>
  );
};
