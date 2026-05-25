import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import appStore from './app/appStore.js';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={appStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
