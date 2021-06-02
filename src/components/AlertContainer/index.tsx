import React from 'react';

import Alert from './Alert';
import * as S from './styles';

interface AlertsData {
  id: string;
  title: string;
  message: string;
}

interface AlertContainerProps {
  alerts: AlertsData[];
}

const AlertContainer: React.FC<AlertContainerProps> = ({ alerts }) => {
  return (
    <S.Container>
      {alerts.map(alert => {
        return (
          <Alert
            key={alert.id}
            id={alert.id}
            title={alert.title}
            message={alert.message}
          />
        );
      })}
    </S.Container>
  );
};

export default AlertContainer;
