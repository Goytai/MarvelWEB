import React from 'react';
import { Link } from 'react-router-dom';
import { Link as Anchor } from 'react-scroll';

import * as S from './styles';

const Header: React.FC = () => {
  return (
    <S.Container>
      <S.Logo />

      <input type="text" placeholder="Buscar" name="search" />

      <nav>
        <Link to="/dashboard">Home</Link>
        <Anchor spy smooth offset={-70} duration={500} to="characters">
          Characters
        </Anchor>
        <Anchor spy smooth offset={-70} duration={500} to="comics">
          Comics
        </Anchor>
        <S.Avatar />
      </nav>
    </S.Container>
  );
};

export default Header;
