import React, { useEffect } from 'react';
import { useAlert } from 'src/hooks/alert';

import * as S from './styles';

interface AlertProps {
  id: string;
  title: string;
  message: string;
}

const Alert: React.FC<AlertProps> = ({ id, title, message }) => {
  const { removeAlert } = useAlert();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeAlert(id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeAlert]);

  return (
    <S.Container>
      <h2>{title}</h2>
      <p>{message}</p>
    </S.Container>
  );
};

export default Alert;
