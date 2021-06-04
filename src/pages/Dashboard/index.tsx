import React, { useEffect } from 'react';

import Header from 'src/components/Header';
import Card from 'src/components/Card';

import { useData } from 'src/hooks/data';
import * as S from './styles';

const Dashboard: React.FC = () => {
  const { getFavorites, data } = useData();

  useEffect(() => {
    getFavorites();

    return () => {};
  }, [getFavorites]);

  return (
    <S.Container>
      <Header />

      <S.Favorites>
        <h2 id="characters">My favorite characters:</h2>

        <div className="characters">
          {data.favoritesCharacters.length > 0 ? (
            data.favoritesCharacters.map(character => (
              <Card
                key={character.marvel_id}
                marvel_id={character.marvel_id}
                img={character.picture}
                name={character.name}
                isFav={character.isFavorite}
                type="characters"
              />
            ))
          ) : (
            <p>
              You don&#39;t have characters in your favorites, look for some in
              the header
            </p>
          )}
        </div>

        <h2 id="comics">My favorite comics:</h2>

        <div className="comics">
          {data.favoritesComics.length > 0 ? (
            data.favoritesComics.map(comic => (
              <Card
                key={comic.marvel_id}
                marvel_id={comic.marvel_id}
                img={comic.picture}
                title={comic.title}
                isFav={comic.isFavorite}
                type="comics"
              />
            ))
          ) : (
            <p>
              You don&#39;t have comics in your favorites, look for some in the
              header
            </p>
          )}
        </div>
      </S.Favorites>
    </S.Container>
  );
};

export default Dashboard;
