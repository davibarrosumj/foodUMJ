import { createContext, useContext, useEffect, useState } from 'react';
import { API_URL } from '../data/recipes';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/favoritos`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) {
          setFavorites(
            data.map((item) => ({
              id: String(item.id),
              name: item.nome,
              image: item.imagem || '',
              ingredients: [],
              instructions: '',
            })),
          );
        }
      })
      .catch(() => {});
  }, []);

  function isFavorite(id) {
    return favorites.some((item) => item.id === id);
  }

  function addFavorite(recipe) {
    if (isFavorite(recipe.id)) {
      return;
    }

    setFavorites((prev) => [...prev, recipe]);

    fetch(`${API_URL}/favoritos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: recipe.id,
        nome: recipe.name,
        imagem: recipe.image,
      }),
    }).catch(() => {});
  }

  function removeFavorite(id) {
    setFavorites((prev) => prev.filter((item) => item.id !== id));

    fetch(`${API_URL}/favoritos/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }).catch(() => {});
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
