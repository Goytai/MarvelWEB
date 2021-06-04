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

interface CheckFavoritesProps {
  characters: Omit<CharactersProps, 'isFavorite'>[];
  comics: Omit<ComicsProps, 'isFavorite'>[];
  favoritesCharactersIds: number[];
  favoritesComicsIds: number[];
}

interface Return {
  characters: CharactersProps[];
  comics: ComicsProps[];
}

function checkFavorites({
  characters,
  comics,
  favoritesCharactersIds,
  favoritesComicsIds
}: CheckFavoritesProps): Return {
  const resultCharacters = [] as CharactersProps[];
  const resultComics = [] as ComicsProps[];

  characters.forEach(character => {
    const isFavorite =
      favoritesCharactersIds.findIndex(
        id => Number(character.marvel_id) === id
      ) !== -1;

    resultCharacters.push({ ...character, isFavorite });
  });

  comics.forEach(comic => {
    const isFavorite =
      favoritesComicsIds.findIndex(id => Number(comic.marvel_id) === id) !== -1;

    resultComics.push({ ...comic, isFavorite });
  });

  return {
    characters: resultCharacters,
    comics: resultComics
  };
}

export default checkFavorites;
