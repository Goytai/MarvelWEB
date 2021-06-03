import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import api from 'src/services/api';

import Header from 'src/components/Header';
import { useAuth } from 'src/hooks/auth';
import * as S from './styles';

interface URLParams {
  type: string;
  marvelId: string;
}

interface ElementProps {
  title: string;
  description: string;
  picture: string;
}

const Item: React.FC = () => {
  const { type, marvelId } = useParams<URLParams>();
  const { token } = useAuth();

  const [element, setElement] = useState<ElementProps>({
    title: '',
    description: '',
    picture: ''
  });

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`${type}/${marvelId}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const response = data[type][0];

      setElement({
        title: response.name || response.title,
        description: response.description,
        picture: response.picture
      });
    })();
  }, [marvelId, token, type]);

  return (
    <S.Container>
      <Header />

      <section>
        <img src={element.picture} alt={element.title} />

        <main>
          <h2>{element.title}</h2>
          <p>{element.description}</p>
          <button type="button">
            Favorite
            <AiFillHeart size={24} />
          </button>
        </main>
      </section>
    </S.Container>
  );
};

export default Item;
