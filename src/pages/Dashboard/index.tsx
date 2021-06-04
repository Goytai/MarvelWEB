import React, { useEffect, useState } from 'react';

import Header from 'src/components/Header';
import Card from 'src/components/Card';

import api from 'src/services/api';
import { useAuth } from 'src/hooks/auth';

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

interface MarvelData {
  characters: CharactersProps[];
  comics: ComicsProps[];
}

const Dashboard: React.FC = () => {
  const { token } = useAuth();

  const [marvelData, setMarvelData] = useState<MarvelData>({
    characters: [],
    comics: []
  });

  useEffect(() => {
    (async () => {
      const { data } = await api.get('users', {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const responseCharacters = data.user.characters as Omit<
        CharactersProps,
        'isFavorite'
      >[];
      const responseComics = data.user.comics as Omit<
        ComicsProps,
        'isFavorite'
      >[];

      const characters: CharactersProps[] = [];
      const comics: ComicsProps[] = [];

      responseCharacters.forEach(oldCharacter =>
        characters.push({ ...oldCharacter, isFavorite: true })
      );
      responseComics.forEach(oldComic =>
        comics.push({ ...oldComic, isFavorite: true })
      );

      setMarvelData({
        characters,
        comics
      });
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

        <div className="characters">
          {marvelData.characters.map(character => (
            <Card
              id={character.marvel_id}
              img={character.picture}
              name={character.name}
              isFav={character.isFavorite}
              type="characters"
            />
          ))}
        </div>

        <h2 id="comics">Minhas comics favoritas</h2>

        <div className="comics">
          {marvelData.comics.map(comic => (
            <Card
              id={comic.marvel_id}
              img={comic.picture}
              title={comic.title}
              isFav={comic.isFavorite}
              type="comics"
            />
          ))}
        </div>
      </S.Favorites>
    </S.Container>
  );
};

export default Dashboard;
