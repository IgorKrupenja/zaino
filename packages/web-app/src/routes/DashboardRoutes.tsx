import { Route, Routes } from 'react-router-dom';
import { EditItem } from '../components/item-modal/EditItem';
import { NewItem } from '../components/item-modal/NewItem';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="new" element={<NewItem />} />
      <Route path="edit/:id" element={<EditItem />} />
    </Routes>
  );
};
