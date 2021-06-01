import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from 'src/hooks/auth';

import * as Yup from 'yup';
import * as S from './styles';

const Login: React.FC = () => {
  const history = useHistory();

  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatório')
        });

        await schema.validate({ email, password });

        await signIn({ email, password });

        history.push('/dashboard');
      } catch (error) {
        console.log(error);
      }
    },
    [email, history, password, signIn]
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

          <input type="submit" value="Fazer login" />

          <Link to="/register">Ainda não possui conta?</Link>
        </form>
      </S.Box>
      <S.Thumbnail />
    </S.Container>
  );
};

export default Login;
