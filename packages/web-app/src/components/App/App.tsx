import { useMediaQuery } from 'react-responsive';
import { AppRouter } from '../../routes';
import { AuthStateHandler } from '../AuthStateHandler';
import { MobilePlaceholder } from '../common/Misc/MobilePlaceholder';

export const App = () => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 599px)' });

  return (
    <AuthStateHandler>{isSmallScreen ? <MobilePlaceholder /> : <AppRouter />}</AuthStateHandler>
  );
};
