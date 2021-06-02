import React from 'react';
import { AlertProvider } from './alert';
import { AuthProvider } from './auth';
import { ErrorProvider } from './error';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AlertProvider>
      <ErrorProvider>
        <AuthProvider>{children}</AuthProvider>
      </ErrorProvider>
    </AlertProvider>
  );
};

export default AppProvider;
