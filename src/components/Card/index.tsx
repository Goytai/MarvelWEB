import React, { useCallback } from 'react';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import * as S from './styles';

interface CardProps {
  id: string;
  img: string;
  type: 'characters' | 'comics';
  name?: string;
  title?: string;
  isFav: boolean;
}

const Card: React.FC<CardProps> = ({ id, img, type, name, title, isFav }) => {
  const favoriteSubmit = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
    },
    []
  );

  return (
    <S.Container type={type} img={img} to={`/${type}/${id}`}>
      <h4>{name || title}</h4>
      <button type="button" onClick={event => favoriteSubmit(event)}>
        {isFav ? <AiFillHeart size={30} /> : <AiOutlineHeart size={30} />}
      </button>
    </S.Container>
  );
};

export default Card;
