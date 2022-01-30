import { Route, Routes } from 'react-router-dom';
import { EditItem } from '../components/ItemModal/EditItem';
import { NewItem } from '../components/ItemModal/NewItem';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="new" element={<NewItem />} />
      <Route path="edit/:id" element={<EditItem />} />
    </Routes>
  );
};
