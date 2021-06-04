import React, { createContext, useCallback, useContext, useState } from 'react';

import api from 'src/services/api';
import { useAuth } from './auth';

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
  favoritesCharacters: CharactersProps[];
  favoritesComics: ComicsProps[];
  favoritesCharactersIds: number[];
  favoritesComicsIds: number[];
}

interface AuthContextData {
  data: DataProps;
  getFavorites(): Promise<void>;
  addFavorite(newFavorite: AddFavoriteProps): void;
  removeFavorite(removeFavorite: RemoveFavoriteProps): void;
}

interface AddFavoriteProps extends MarvelContent {
  name?: string;
  title?: string;
  type: 'character' | 'comic';
}

interface RemoveFavoriteProps {
  type: string;
  marvel_id: string;
}

const DataContext = createContext({} as AuthContextData);

export const DataProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<DataProps>({
    favoritesCharacters: [],
    favoritesComics: [],
    favoritesCharactersIds: [],
    favoritesComicsIds: []
  });

  const { token, user } = useAuth();

  const getFavorites = useCallback(async () => {
    const { data: response } = await api.get('users', {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    const responseCharacters = response.user.characters as Omit<
      CharactersProps,
      'isFavorite'
    >[];
    const responseComics = response.user.comics as Omit<
      ComicsProps,
      'isFavorite'
    >[];

    const characters: CharactersProps[] = [];
    const comics: ComicsProps[] = [];
    const charactersIds: number[] = [];
    const comicsIds: number[] = [];

    responseCharacters.forEach(oldCharacter => {
      characters.push({ ...oldCharacter, isFavorite: true });
      charactersIds.push(Number(oldCharacter.marvel_id));
    });
    responseComics.forEach(oldComic => {
      comics.push({ ...oldComic, isFavorite: true });
      comicsIds.push(Number(oldComic.marvel_id));
    });

    setData({
      favoritesCharacters: characters,
      favoritesComics: comics,
      favoritesCharactersIds: charactersIds,
      favoritesComicsIds: comicsIds
    });
  }, [token]);

  const addFavorite = useCallback(
    async ({
      marvel_id,
      type,
      name,
      picture,
      title,
      description
    }: AddFavoriteProps) => {
      await api.patch(
        `${type}s`,
        {
          [type]: {
            marvel_id,
            name,
            title,
            picture,
            description
          }
        },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );

      switch (type) {
        case 'character':
          setData(old =>
            Object.assign(old, {
              favoritesCharacters: [
                ...old.favoritesCharacters,
                { marvel_id, name, picture, description, isFavorite: true }
              ],
              favoritesCharactersIds: [
                ...old.favoritesCharactersIds,
                Number(marvel_id)
              ]
            })
          );
          break;
        case 'comic':
          setData(old =>
            Object.assign(old, {
              favoritesComics: [
                ...old.favoritesComics,
                { marvel_id, title, picture, description, isFavorite: true }
              ],
              favoritesCharactersIds: [
                ...old.favoritesCharactersIds,
                Number(marvel_id)
              ]
            })
          );
          break;
        default:
      }
    },
    [token]
  );

  const removeFavorite = useCallback(
    async ({ type, marvel_id }: RemoveFavoriteProps) => {
      await api.delete(`${type}s`, {
        headers: { authorization: `Bearer ${token}` },
        data: { user_id: user.user_id, marvel_id }
      });

      switch (type) {
        case 'character':
          setData(old => {
            const newFavorites = old.favoritesCharacters.filter(
              character => character.marvel_id !== marvel_id
            );

            const newFavoritesId = old.favoritesCharactersIds.filter(
              oldIndex => oldIndex !== Number(marvel_id)
            );

            return {
              ...old,
              favoritesCharacters: newFavorites,
              favoritesCharactersIds: newFavoritesId
            };
          });
          break;
        case 'comic':
          setData(old => {
            const newFavorites = old.favoritesComics.filter(
              comic => comic.marvel_id !== marvel_id
            );

            const newFavoritesId = old.favoritesCharactersIds.filter(
              oldIndex => oldIndex !== Number(marvel_id)
            );

            return {
              ...old,
              favoritesComics: newFavorites,
              favoritesCharactersIds: newFavoritesId
            };
          });
          break;
        default:
      }
    },
    [token, user]
  );

  return (
    <DataContext.Provider
      value={{
        data,
        getFavorites,
        addFavorite,
        removeFavorite
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export function useData(): AuthContextData {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useData must be used within an DataProvider');
  }

  return context;
}
