import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'react-perfect-scrollbar/dist/css/styles.css';
// import dotenv from 'dotenv';
import { enableES5 } from 'immer';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SettingsProvider } from 'src/context/SettingsContext';
import { store, persistor } from 'src/store';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { unregister } from 'src/serviceWorker';
import App from 'src/App';
import './styles/index.css';
enableES5();
// if (process.env.NODE_ENV === 'development') {
//   dotenv.config();
// }

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ErrorBoundary>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </ErrorBoundary>
    </PersistGate>
  </Provider>
);

//DUMMY TEXT

unregister();
