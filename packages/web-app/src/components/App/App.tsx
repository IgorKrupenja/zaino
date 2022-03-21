import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { AppRouter } from '../../routes';
import { store } from '../../state/store';
import { AuthStateHandler } from '../AuthStateHandler';
import { MobilePlaceholder } from '../common/Misc/MobilePlaceholder';

export const App = () => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 599px)' });

  return (
    <StrictMode>
      <Provider store={store}>
        <AuthStateHandler>{isSmallScreen ? <MobilePlaceholder /> : <AppRouter />}</AuthStateHandler>
      </Provider>
    </StrictMode>
  );
};
