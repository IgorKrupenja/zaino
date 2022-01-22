import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { EditItem } from '../components/ItemModal/EditItem';
import { NewItem } from '../components/ItemModal/NewItem';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard/new" element={<NewItem />} />
      <Route path="/dashboard/edit/:id" element={<EditItem />} />
    </Routes>
  );
};
