import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { styles } from '../styles';

export function HomeScreen({ onSearch, onOpenFavorites }) {
  const [query, setQuery] = useState('');
  const { favorites } = useFavorites();
  const hasQuery = query.trim().length > 0;

  function handleSearchPress() {
    if (!hasQuery) {
      return;
    }
    onSearch(query);
  }

  return (
    <View style={styles.homeContainer}>
      <Ionicons name="restaurant" size={56} color="#d9534f" style={styles.logo} />
      <Text style={styles.title}>FoodUMJ: Receitas</Text>
      <Text style={styles.subtitle}>Encontre receitas simples e salve suas favoritas</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome da receita..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearchPress}
        returnKeyType="search"
      />

      <View style={styles.actions}>
        <Button
          title="Pesquisar"
          color="#d9534f"
          disabled={!hasQuery}
          onPress={handleSearchPress}
        />
        <Button
          title={`Meus Favoritos (${favorites.length})`}
          onPress={onOpenFavorites}
        />
      </View>
    </View>
  );
}
