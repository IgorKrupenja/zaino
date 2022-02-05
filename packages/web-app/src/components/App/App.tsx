import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import AppRouter from '../../routes/AppRouter';
import { store } from '../../state/store';
import { AuthStateHandler } from '../AuthStateHandler';
import { MobilePlaceholder } from '../pages/MobilePlaceholder';

export const App = () => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 599px)' });

  return (
    <StrictMode>
      <Provider store={store}>
        {isSmallScreen ? (
          <MobilePlaceholder />
        ) : (
          <AuthStateHandler>
            <AppRouter />
          </AuthStateHandler>
        )}
      </Provider>
    </StrictMode>
  );
};
