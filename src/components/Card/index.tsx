import React, { useCallback, useState } from 'react';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useData } from 'src/hooks/data';

import * as S from './styles';

interface CardProps {
  marvel_id: string;
  img: string;
  type: 'characters' | 'comics';
  name?: string;
  title?: string;
  description?: string;
  isFav: boolean;
}

const Card: React.FC<CardProps> = ({
  marvel_id,
  img,
  type,
  name,
  title,
  description,
  isFav
}) => {
  const { addFavorite, removeFavorite } = useData();

  const [isFavorite, setIsFavorite] = useState(isFav);

  const favoriteSubmit = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      const singleType = type.slice(0, -1) as 'character' | 'comic';

      if (isFav) {
        removeFavorite({
          marvel_id,
          type: singleType
        });
      } else {
        addFavorite({
          marvel_id,
          name,
          title,
          description,
          isFavorite: !isFavorite,
          picture: img,
          type: singleType
        });
      }

      setIsFavorite(old => !old);
    },
    [
      addFavorite,
      description,
      img,
      isFav,
      isFavorite,
      marvel_id,
      name,
      removeFavorite,
      title,
      type
    ]
  );

  return (
    <S.Container type={type} img={img} to={`/${type}/${marvel_id}`}>
      <h4>{name || title}</h4>
      <button type="button" onClick={event => favoriteSubmit(event)}>
        {isFavorite ? <AiFillHeart size={30} /> : <AiOutlineHeart size={30} />}
      </button>
    </S.Container>
  );
};

export default Card;
