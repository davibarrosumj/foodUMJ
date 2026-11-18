import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function addFavorite(recipe) {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === recipe.id)) {
        return prev;
      }
      return [...prev, recipe];
    });
  }

  function removeFavorite(id) {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  }

  function isFavorite(id) {
    return favorites.some((item) => item.id === id);
  }

  function toggleFavorite(recipe) {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
