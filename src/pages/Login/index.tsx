import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as S from './styles';

const Login: React.FC = () => {
  const history = useHistory();

  const formSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      history.push('/dashboard');
    },
    [history]
  );

  return (
    <S.Container>
      <S.Box>
        <S.Logo />
        <form onSubmit={event => formSubmit(event)}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            placeholder="Insira seu e-mail"
            name="email"
            id="email"
          />

          <label htmlFor="pass">Senha:</label>
          <input
            type="password"
            placeholder="Insira sua senha"
            name="pass"
            id="pass"
          />

          <input type="submit" value="Fazer login" />

          <Link to="/register">Ainda não possui conta?</Link>
        </form>
      </S.Box>
      <S.Thumbnail />
    </S.Container>
  );
};

export default Login;
