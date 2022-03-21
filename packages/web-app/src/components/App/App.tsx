import { useMediaQuery } from 'react-responsive';
import { useAuthState } from '../../hooks/useAuthState';
import { AppRouter } from '../../routes';
import { Loader } from '../common/Misc/Loader';
import { MobilePlaceholder } from '../common/Misc/MobilePlaceholder';

export const App = () => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 599px)' });
  const isLoading = useAuthState();

  return <>{isLoading ? <Loader /> : isSmallScreen ? <MobilePlaceholder /> : <AppRouter />}</>;
};
