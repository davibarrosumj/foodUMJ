import { Button, FlatList, Image, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { styles } from '../styles';

export function FavoritesScreen({ onSelectRecipe, onBack }) {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Button title="Voltar" onPress={onBack} />
        <Text style={styles.headerTitle}>Meus Favoritos</Text>
        <View style={styles.headerSpacer} />
      </View>

      {favorites.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="heart-outline" size={48} color="#6c757d" />
          <Text style={styles.statusText}>Nenhuma receita favorita ainda.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.row}>
                <Image source={{ uri: item.image }} style={styles.thumbnail} />
                <Text style={[styles.sectionTitle, styles.flex1]}>{item.name}</Text>
              </View>

              <View style={styles.cardActions}>
                <Button title="Detalhes" onPress={() => onSelectRecipe(item)} />
                <Button
                  title="Remover"
                  color="#d9534f"
                  onPress={() => removeFavorite(item.id)}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
