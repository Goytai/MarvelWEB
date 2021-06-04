import React from 'react';
import { AlertProvider } from './alert';
import { AuthProvider } from './auth';
import { DataProvider } from './data';
import { ErrorProvider } from './error';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AlertProvider>
      <ErrorProvider>
        <AuthProvider>
          <DataProvider>{children}</DataProvider>
        </AuthProvider>
      </ErrorProvider>
    </AlertProvider>
  );
};

export default AppProvider;
