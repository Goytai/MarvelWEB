import React from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';

const Register: React.FC = () => {
  return (
    <S.Container>
      <S.Thumbnail />
      <S.Box>
        <S.Logo />
        <form>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            placeholder="Insira seu nome"
            name="name"
            id="name"
          />

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

          <input type="submit" value="Fazer cadastro" />

          <Link to="/">Já possui conta?</Link>
        </form>
      </S.Box>
    </S.Container>
  );
};

export default Register;
