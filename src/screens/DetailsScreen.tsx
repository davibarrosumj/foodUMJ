import { Button, Image, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { styles } from '../styles';

export function DetailsScreen({ recipe, onBack }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(recipe.id);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Button title="Voltar" onPress={onBack} />
        <Text style={styles.headerTitle}>Detalhes</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        <Image source={{ uri: recipe.image }} style={styles.bannerImage} />

        <Text style={styles.detailTitle}>{recipe.name}</Text>

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
              onPress={() => toggleFavorite(recipe)}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Ingredientes</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={`${recipe.id}-ing-${index}`} style={styles.bodyText}>
              • {ingredient}
            </Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Modo de Preparo</Text>
          <Text style={styles.bodyText}>{recipe.instructions}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
