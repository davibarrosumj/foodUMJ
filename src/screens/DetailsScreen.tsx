import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { getRecipeById } from '../data/recipes';
import { styles } from '../styles';

export function DetailsScreen({ recipe, onBack }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [details, setDetails] = useState(recipe);
  const [loading, setLoading] = useState(
    !recipe.instructions && recipe.ingredients.length === 0,
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    setDetails(recipe);

    if (recipe.instructions || recipe.ingredients.length > 0) {
      setLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    getRecipeById(recipe.id)
      .then((data) => {
        if (isMounted) {
          setDetails(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Não foi possível carregar os detalhes da receita.',
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [recipe]);

  const favorited = isFavorite(details.id);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Button title="Voltar" onPress={onBack} />
        <Text style={styles.headerTitle}>Detalhes</Text>
        <View style={styles.headerSpacer} />
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#d9534f" />
          <Text style={styles.statusText}>Carregando detalhes...</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Ionicons name="alert-circle-outline" size={48} color="#d9534f" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          <Image source={{ uri: details.image }} style={styles.bannerImage} />

          <Text style={styles.detailTitle}>{details.name}</Text>

          <View style={styles.row}>
            <Ionicons
              name={favorited ? 'heart' : 'heart-outline'}
              size={24}
              color="#d9534f"
            />
            <View style={styles.flex1}>
              <Button
                title={favorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                color="#d9534f"
                onPress={() => toggleFavorite(details)}
              />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Ingredientes</Text>
            {details.ingredients.map((ingredient, index) => (
              <Text key={`${details.id}-ing-${index}`} style={styles.bodyText}>
                • {ingredient}
              </Text>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Modo de Preparo</Text>
            <Text style={styles.bodyText}>{details.instructions}</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
