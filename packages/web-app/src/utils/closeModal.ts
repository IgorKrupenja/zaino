import { history } from '../routes/AppRouter';

export const closeModal = () => {
  document.title = 'Dashboard | Zaino';
  history.push('/dashboard');
};
