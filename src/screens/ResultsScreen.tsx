import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { searchRecipes } from '../data/recipes';
import { styles } from '../styles';

export function ResultsScreen({
  query,
  onSelectRecipe,
  onBack,
  onOpenFavorites,
}) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);
  const { favorites, isFavorite } = useFavorites();

  useEffect(() => {
    let isMounted = true;

    async function loadRecipes() {
      setLoading(true);
      setError(null);

      try {
        const data = await searchRecipes(query);
        if (isMounted) {
          setRecipes(data);
        }
      } catch (err) {
        if (isMounted) {
          const message =
            err instanceof Error
              ? err.message
              : 'Ocorreu um erro inesperado ao buscar receitas.';
          setError(message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadRecipes();

    return () => {
      isMounted = false;
    };
  }, [query, reloadCount]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Button title="Voltar" onPress={onBack} />
        <Text style={styles.headerTitle}>Resultados</Text>
        <Button
          title={`Favoritos (${favorites.length})`}
          color="#d9534f"
          onPress={onOpenFavorites}
        />
      </View>

      <Text style={styles.queryInfo}>
        {query.trim() ? `Busca: "${query.trim()}"` : 'Mostrando todas as receitas'}
      </Text>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#d9534f" />
          <Text style={styles.statusText}>Carregando receitas...</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Ionicons name="alert-circle-outline" size={48} color="#d9534f" />
          <Text style={styles.errorText}>{error}</Text>
          <Button
            title="Tentar novamente"
            color="#d9534f"
            onPress={() => setReloadCount((prev) => prev + 1)}
          />
        </View>
      ) : recipes.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="search-outline" size={44} color="#6c757d" />
          <Text style={styles.statusText}>Nenhuma receita encontrada.</Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.row}>
                <Image source={{ uri: item.image }} style={styles.thumbnail} />
                <View style={styles.flex1}>
                  <Text style={styles.sectionTitle}>{item.name}</Text>
                  <Text style={styles.mutedText}>
                    {item.ingredients.length} ingredientes
                  </Text>
                </View>
                {isFavorite(item.id) && (
                  <Ionicons name="heart" size={20} color="#d9534f" />
                )}
              </View>
              <Button title="Ver detalhes" onPress={() => onSelectRecipe(item)} />
            </View>
          )}
        />
      )}
    </View>
  );
}
