import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart, AiOutlineLoading } from 'react-icons/ai';

import api from 'src/services/api';

import Header from 'src/components/Header';
import { useAuth } from 'src/hooks/auth';
import { useData } from 'src/hooks/data';
import * as S from './styles';

interface URLParams {
  type: string;
  marvelId: string;
}

interface ElementProps {
  title?: string;
  name?: string;
  description: string;
  picture: string;
}

const Item: React.FC = () => {
  const { type, marvelId } = useParams<URLParams>();
  const { token } = useAuth();
  const { addFavorite, removeFavorite, data } = useData();

  const [element, setElement] = useState<ElementProps>({
    title: undefined,
    name: undefined,
    description: '',
    picture: ''
  });

  const [isFavorite, setIsFavorite] = useState(() => {
    switch (type) {
      case 'characters':
        return (
          data.favoritesCharactersIds.findIndex(
            id => id === Number(marvelId)
          ) !== -1
        );
      case 'comics':
        return (
          data.favoritesComicsIds.findIndex(id => id === Number(marvelId)) !==
          -1
        );
      default:
        return false;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  const favoriteSubmit = useCallback(async () => {
    const singleType = type.slice(0, -1) as 'character' | 'comic';

    if (isFavorite) {
      removeFavorite({
        marvel_id: marvelId,
        type: singleType
      });
    } else {
      addFavorite({
        marvel_id: marvelId,
        name: element.name,
        title: element.title,
        description: element.description,
        isFavorite: !isFavorite,
        picture: element.picture,
        type: singleType
      });
    }

    setIsFavorite(old => !old);
  }, [addFavorite, element, isFavorite, marvelId, removeFavorite, type]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { data: dataAxios } = await api.get(`${type}/${marvelId}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const response = dataAxios[type][0];

      setIsLoading(false);
      setElement({
        title: response.title,
        name: response.name,
        description: response.description,
        picture: response.picture
      });
    })();
  }, [marvelId, token, type]);

  return (
    <S.Container>
      <Header />

      <section>
        {isLoading ? (
          <AiOutlineLoading size={50} />
        ) : (
          <>
            <img src={element.picture} alt={element.title} />
            <main>
              <h2>{element.title || element.name}</h2>
              <p>
                {element.description
                  ? element.description
                  : 'No description available'}
              </p>
              <button onClick={favoriteSubmit} type="button">
                Favorite
                {isFavorite ? (
                  <AiFillHeart size={30} />
                ) : (
                  <AiOutlineHeart size={30} />
                )}
              </button>
            </main>
          </>
        )}
      </section>
    </S.Container>
  );
};

export default Item;
