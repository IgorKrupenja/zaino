import { useMediaQuery } from 'react-responsive';
import { useAuth } from '../../hooks';
import { AppRouter } from '../../routes';
import { Loader } from '../common/misc/Loader';
import { MobilePlaceholder } from '../common/misc/MobilePlaceholder';

export const App = () => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 599px)' });
  const isLoading = useAuth();

  return <>{isLoading ? <Loader /> : isSmallScreen ? <MobilePlaceholder /> : <AppRouter />}</>;
};
