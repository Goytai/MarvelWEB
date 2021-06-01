import React from 'react';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import * as S from './styles';

interface CardProps {
  id: number;
  img: string;
  name?: string;
  isFav: boolean;
}

const Card: React.FC<CardProps> = ({ id, img, name, isFav }) => {
  return (
    <S.Container img={img} href={`/item/${id}`}>
      <h4>{name}</h4>
      {isFav ? <AiFillHeart size={22} /> : <AiOutlineHeart size={22} />}
    </S.Container>
  );
};

export default Card;
