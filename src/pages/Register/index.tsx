import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from 'src/services/api';

import { useError } from 'src/hooks/error';

import * as Yup from 'yup';
import * as S from './styles';

const Register: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { errorResolve } = useError();

  const formSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos')
        });

        await schema.validate(
          { name, email, password },
          {
            abortEarly: false
          }
        );

        await api.post('/users', {
          name,
          email,
          password
        });

        history.push('/');
      } catch (errors) {
        errorResolve(errors);
      }
    },
    [email, errorResolve, history, name, password]
  );

  return (
    <S.Container>
      <S.Thumbnail />
      <S.Box>
        <S.Logo />
        <form onSubmit={event => formSubmit(event)}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            placeholder="Insira seu nome"
            name="name"
            id="name"
            value={name}
            onChange={event => setName(event.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="text"
            placeholder="Insira seu e-mail"
            name="email"
            id="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <label htmlFor="pass">Senha:</label>
          <input
            type="password"
            placeholder="Insira sua senha"
            name="pass"
            id="pass"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <input type="submit" value="Fazer cadastro" />

          <Link to="/">Já possui conta?</Link>
        </form>
      </S.Box>
    </S.Container>
  );
};

export default Register;
