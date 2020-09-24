import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { AddItem } from '../components/ItemModal/AddItem';
import { EditItem } from '../components/ItemModal/EditItem';
import { RootState } from '../state/store';

type Match = { params: { id: string } };

/**
 * Provides routes specific to Dashboard page.
 */
export const DashboardRoutes = () => {
  const items = useSelector((state: RootState) => state.items);

  return (
    <>
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
