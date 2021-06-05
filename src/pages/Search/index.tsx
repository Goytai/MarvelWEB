import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';

import api from 'src/services/api';

import { useAuth } from 'src/hooks/auth';
import { useData } from 'src/hooks/data';

import Header from 'src/components/Header';
import Card from 'src/components/Card';

import * as S from './styles';

interface MarvelContent {
  marvel_id: string;
  description?: string;
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
  const { checkFavorites } = useData();

  const [isLoading, setIsLoading] = useState(false);
  const [searchItems, setSearchItems] = useState<DataProps>({
    characters: [],
    comics: []
  });

  const searchRequest = useCallback(async () => {
    setIsLoading(true);
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

    const { characters, comics } = checkFavorites({
      remoteCharacters: response[0].data.characters,
      remoteComics: response[1].data.comics
    });

    setIsLoading(false);
    setSearchItems({
      characters,
      comics
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, token]);

  useEffect(() => {
    searchRequest();
  }, [searchRequest]);

  return (
    <S.Container>
      <Header />

      <S.Main>
        {isLoading ? (
          <AiOutlineLoading size={50} />
        ) : (
          <>
            <h2>Characters found:</h2>

            <div className="characters">
              {searchItems.characters.map(character => (
                <Card
                  key={character.marvel_id}
                  marvel_id={character.marvel_id}
                  img={character.picture}
                  name={character.name}
                  isFav={character.isFavorite}
                  type="characters"
                />
              ))}
            </div>

            <h2>Comics found:</h2>

            <div className="characters">
              {searchItems.comics.map(comic => (
                <Card
                  key={comic.marvel_id}
                  marvel_id={comic.marvel_id}
                  img={comic.picture}
                  title={comic.title}
                  isFav={comic.isFavorite}
                  type="comics"
                />
              ))}
            </div>
          </>
        )}
      </S.Main>
    </S.Container>
  );
};

export default Search;
