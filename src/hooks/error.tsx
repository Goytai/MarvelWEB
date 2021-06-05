import React, { createContext, useCallback, useContext } from 'react';
import { useAlert } from 'src/hooks/alert';

import api from 'src/services/api';

import * as Yup from 'yup';

interface AlertContextData {
  errorResolve(error: Error): void;
}

export const ErrorContext = createContext<AlertContextData>(
  {} as AlertContextData
);

export const ErrorProvider: React.FC = ({ children }) => {
  const { addAlert } = useAlert();

  api.interceptors.response.use(
    res => res,
    error => {
      if (error.response.status === undefined) {
        throw error;
      }

      const statusCode = String(error.response.status);
      switch (statusCode) {
        case '400':
          addAlert({
            title: 'Invalid credentials',
            message: 'Check the email and password'
          });
          break;
        case '500':
          addAlert({
            title: 'Internal server error',
            message: 'Please try later'
          });
          break;
        default:
          addAlert({
            title: 'Unexpected error',
            message: 'Please try later'
          });
      }
    }
  );

  const errorResolve = useCallback(
    (error: Error) => {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach(err => {
          addAlert({
            title: `Incorrect ${err.path}`,
            message: err.message
          });
        });
      }
    },
    [addAlert]
  );

  return (
    <ErrorContext.Provider value={{ errorResolve }}>
      {children}
    </ErrorContext.Provider>
  );
};

export function useError(): AlertContextData {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error('useError must be used within a ErrorProvider');
  }

  return context;
}
