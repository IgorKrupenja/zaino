import 'normalize.css/normalize.css';
import './styles/styles.scss';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './components/App';
import { store } from './state/store';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
