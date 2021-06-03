import React, { useEffect, useState } from 'react';

import Header from 'src/components/Header';
import Card from 'src/components/Card';

import api from 'src/services/api';
import { useAuth } from 'src/hooks/auth';
import * as S from './styles';

interface CharactersProps {
  marvel_id: string;
  name: string;
  description: string;
  picture: string;
}

interface ComicsProps {
  marvel_id: string;
  title: string;
  description: string;
  picture: string;
}

const Dashboard: React.FC = () => {
  const { token } = useAuth();

  const [characters, setCharacters] = useState<CharactersProps[]>([]);
  const [comics, setComics] = useState<ComicsProps[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('users', {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      setCharacters(data.user.characters);
      setComics(data.user.comics);
    })();
  }, [token]);

  return (
    <S.Container>
      <Header />

      {/* <S.Highlights>
        {highlights.map(comic => (
          <Card
            key={comic.marvel_id}
            id={comic.marvel_id}
            img={comic.picture}
            name={comic.title}
            isFav={false}
          />
        ))}
      </S.Highlights> */}

      <S.Favorites>
        <h2 id="characters">Meus personagens favoritos</h2>

        <div>
          {characters.map(character => (
            <Card
              id={character.marvel_id}
              img={character.picture}
              type="characters"
              isFav={false}
            />
          ))}
        </div>

        <h2 id="comics">Minhas comics favoritas</h2>

        <div>
          {comics.map(comic => (
            <Card
              id={comic.marvel_id}
              type="comics"
              img={comic.picture}
              isFav={false}
            />
          ))}
        </div>
      </S.Favorites>
    </S.Container>
  );
};

export default Dashboard;
