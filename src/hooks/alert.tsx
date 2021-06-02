import React, { createContext, useCallback, useContext, useState } from 'react';

import { uuid } from 'uuidv4';

import AlertContainer from 'src/components/AlertContainer';

interface AlertsData {
  id: string;
  title: string;
  message: string;
}

interface AlertContextData {
  addAlert(alert: Omit<AlertsData, 'id'>): void;
  removeAlert(id: string): void;
}

const AlertContext = createContext<AlertContextData>({} as AlertContextData);

export const AlertProvider: React.FC = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertsData[]>([] as AlertsData[]);

  const addAlert = useCallback(({ title, message }) => {
    const id = uuid();

    setAlerts(oldAlerts => [...oldAlerts, { id, title, message }]);
  }, []);

  const removeAlert = useCallback(id => {
    setAlerts(oldAlerts => oldAlerts.filter(alert => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ addAlert, removeAlert }}>
      {children}
      <AlertContainer alerts={alerts} />
    </AlertContext.Provider>
  );
};

export function useAlert(): AlertContextData {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('useAlert must be used within a AlertProvider');
  }

  return context;
}
