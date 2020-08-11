import { history } from '../routers/AppRouter';

export const closeModal = () => {
  // restore title after closing
  document.title = 'Zaino';
  history.push('/dashboard');
};
