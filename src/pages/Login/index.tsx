import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from 'src/hooks/auth';
import { useError } from 'src/hooks/error';

import * as Yup from 'yup';
import * as S from './styles';

const Login: React.FC = () => {
  const history = useHistory();

  const { signIn } = useAuth();
  const { errorResolve } = useError();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email is required')
            .email('Insert a valid email.'),
          password: Yup.string().required('Password is required')
        });

        await schema.validate(
          { email, password },
          {
            abortEarly: false
          }
        );

        await signIn({ email, password });

        history.push('/dashboard');
      } catch (error) {
        errorResolve(error);
      }
    },
    [email, errorResolve, history, password, signIn]
  );

  return (
    <S.Container>
      <S.Box>
        <S.Logo />
        <form onSubmit={event => formSubmit(event)}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            placeholder="Insert your email"
            name="email"
            id="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            placeholder="Insert your password"
            name="pass"
            id="pass"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <input type="submit" value="Sign in" />

          <Link to="/register">Don&#39;t have an account?</Link>
        </form>
      </S.Box>
      <S.Thumbnail />
    </S.Container>
  );
};

export default Login;
