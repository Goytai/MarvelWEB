import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './hooks';
import Routes from './routes';
import GlobalStyles from './styles/globals';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <Routes />
        </AppProvider>
      </BrowserRouter>
      <GlobalStyles />
    </>
  );
};

export default App;
