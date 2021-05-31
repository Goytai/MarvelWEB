import React from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';

const Login: React.FC = () => {
  return (
    <S.Container>
      <S.Box>
        <S.Logo />
        <form>
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

          <Link to="/register">Esqueceu a senha ?</Link>
        </form>
      </S.Box>
      <S.Thumbnail />
    </S.Container>
  );
};

export default Login;
