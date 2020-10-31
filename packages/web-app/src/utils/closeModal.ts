import { sessionHistory } from '../routes/AppRouter';

export const closeModal = () => {
  document.title = 'Dashboard | Zaino';
  sessionHistory.push('/dashboard');
};
