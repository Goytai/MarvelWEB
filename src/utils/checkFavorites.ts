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

interface CheckFavoritesProps {
  characters: Omit<CharactersProps, 'isFavorite'>[];
  comics: Omit<ComicsProps, 'isFavorite'>[];
  user: {
    characters: Omit<CharactersProps, 'isFavorite'>[];
    comics: Omit<ComicsProps, 'isFavorite'>[];
  };
}

interface Return {
  characters: CharactersProps[];
  comics: ComicsProps[];
}

function checkFavorites({
  characters,
  comics,
  user
}: CheckFavoritesProps): Return {
  const favoritesCharacters = user.characters;
  const favoritesComics = user.comics;

  const resultCharacters = [] as CharactersProps[];
  const resultComics = [] as ComicsProps[];

  characters.forEach(character => {
    const isFavorite =
      favoritesCharacters.findIndex(
        favoriteCharacter => favoriteCharacter.marvel_id === character.marvel_id
      ) !== -1;

    resultCharacters.push({ ...character, isFavorite });
  });

  comics.forEach(comic => {
    const isFavorite =
      favoritesComics.findIndex(
        favoriteComic => favoriteComic.marvel_id === comic.marvel_id
      ) !== -1;

    resultComics.push({ ...comic, isFavorite });
  });

  return {
    characters: resultCharacters,
    comics: resultComics
  };
}

export default checkFavorites;
