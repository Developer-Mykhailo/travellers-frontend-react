import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { appStore, persistor } from './app/appStore.js';

import App from './App.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={appStore}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </StrictMode>
);
