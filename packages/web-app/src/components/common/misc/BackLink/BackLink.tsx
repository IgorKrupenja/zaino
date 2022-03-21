import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../../state/store';
import { getClassString } from '../../../../utils';
import './style.scss';

type BackLinkProps = {
  className?: string;
};

export const BackLink = ({ className }: BackLinkProps) => {
  const isAuthenticated = useSelector((state: RootState) => !!state.user.uid);
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className={getClassString('back-link', className)}>
      ← Back to {isAuthenticated ? 'app' : 'login page'}
    </button>
  );
};
