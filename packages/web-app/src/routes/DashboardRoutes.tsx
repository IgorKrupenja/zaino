import { Route, Routes } from 'react-router-dom';
import { EditItem } from '../components/item-modal/EditItem';
import { NewItem } from '../components/item-modal/NewItem';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<NewItem />} path="new" />
      <Route element={<EditItem />} path="edit/:id" />
    </Routes>
  );
};
