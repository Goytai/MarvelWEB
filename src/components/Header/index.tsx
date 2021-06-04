import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { Link as Anchor } from 'react-scroll';

import { HashLink as Anchor } from 'react-router-hash-link';

import { ImExit } from 'react-icons/im';

import { useAuth } from 'src/hooks/auth';
import * as S from './styles';

const Header: React.FC = () => {
  const [search, setSearch] = useState('');
  const { signOut } = useAuth();
  const history = useHistory();

  const formSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      history.push(`/search?filter=${search}`);
    },
    [history, search]
  );

  return (
    <S.Container>
      <S.Logo />

      <form onSubmit={event => formSubmit(event)}>
        <input
          type="text"
          placeholder="Buscar"
          name="search"
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
      </form>

      <nav>
        <Link to="/dashboard">Home</Link>
        <Anchor smooth to="/#characters">
          Characters
        </Anchor>
        <Anchor smooth to="/#comics">
          Comics
        </Anchor>
        <S.Avatar>
          <ImExit onClick={signOut} size={18} />
        </S.Avatar>
      </nav>
    </S.Container>
  );
};

export default Header;
