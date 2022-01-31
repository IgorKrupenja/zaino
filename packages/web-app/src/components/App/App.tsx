import { StrictMode } from 'react';
import Media from 'react-media';
import { Provider } from 'react-redux';
import AppRouter from '../../routes/AppRouter';
import { store } from '../../state/store';
import { MobilePlaceholder } from '../pages/MobilePlaceholder';

export const App = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <Media queries={{ small: { maxWidth: 599 } }}>
          {(matches) => (matches.small ? <MobilePlaceholder /> : <AppRouter />)}
        </Media>
      </Provider>
    </StrictMode>
  );
};
