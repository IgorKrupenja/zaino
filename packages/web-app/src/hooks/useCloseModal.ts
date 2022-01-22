import { useNavigate } from 'react-router-dom';

export const useCloseModal = () => {
  const navigate = useNavigate();

  return () => {
    document.title = 'Dashboard | Zaino';
    navigate('/dashboard');
  };
};
