import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../../state/store';
import { getClassString } from '../../../../utils';
import './BackLink.scss';

type BackLinkProps = {
  className?: string;
};

export const BackLink = ({ className }: BackLinkProps) => {
  const isAuthenticated = useSelector((state: RootState) => !!state.user.uid);
  const navigate = useNavigate();

  return (
    <button
      className={getClassString('back-link', { extraClassNames: className })}
      onClick={() => navigate(-1)}
    >
      ← Back to {isAuthenticated ? 'app' : 'login page'}
    </button>
  );
};
