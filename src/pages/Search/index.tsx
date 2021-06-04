import React, { useEffect, useState } from 'react';
import Header from 'src/components/Header';
import { useLocation } from 'react-router-dom';

import api from 'src/services/api';
import { useAuth } from 'src/hooks/auth';
import Card from 'src/components/Card';
import * as S from './styles';

interface MarvelContent {
  marvel_id: string;
  description: string;
  picture: string;
  isFavorite: boolean;
}

interface CharactersProps extends MarvelContent {
  name: string;
}

interface ComicsProps extends MarvelContent {
  title: string;
}

interface DataProps {
  characters: CharactersProps[];
  comics: ComicsProps[];
}

const Search: React.FC = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const filter = query.get('filter');

  const { token } = useAuth();
  const [data, setData] = useState<DataProps>({
    characters: [],
    comics: []
  });

  useEffect(() => {
    (async () => {
      const charactersRequest = api.get('characters', {
        headers: {
          authorization: `Bearer ${token}`
        },
        params: {
          search: filter
        }
      });

      const comicsRequest = api.get('comics', {
        headers: {
          authorization: `Bearer ${token}`
        },
        params: {
          search: filter
        }
      });

      const response = await Promise.all([charactersRequest, comicsRequest]);

      setData({
        characters: response[0].data.characters,
        comics: response[1].data.comics
      });
    })();
  }, [filter, token]);

  return (
    <S.Container>
      <Header />

      <S.Main>
        <h2>Characters found:</h2>

        <div className="characters">
          {data.characters.map(character => (
            <Card
              key={character.marvel_id}
              id={character.marvel_id}
              img={character.picture}
              name={character.name}
              isFav={character.isFavorite}
              type="characters"
            />
          ))}
        </div>

        <h2>Comics found:</h2>

        <div className="characters">
          {data.comics.map(comic => (
            <Card
              key={comic.marvel_id}
              id={comic.marvel_id}
              img={comic.picture}
              title={comic.title}
              isFav={comic.isFavorite}
              type="comics"
            />
          ))}
        </div>
      </S.Main>
    </S.Container>
  );
};

export default Search;
