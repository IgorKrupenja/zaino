import React from 'react';
import { Route } from 'react-router-dom';
import { EditItem } from '../components/ItemModal/EditItem';
import { NewItem } from '../components/ItemModal/NewItem';

export const DashboardRoutes = () => {
  return (
    <>
      <Route path="/dashboard/new">
        <NewItem />
      </Route>
      <Route path="/dashboard/edit/:id">
        <EditItem />
      </Route>
    </>
  );
};
