import { useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
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
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
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
        <Pressable
          style={[styles.button, !hasQuery && styles.buttonDisabled]}
          disabled={!hasQuery}
          onPress={handleSearchPress}
        >
          <Text style={styles.buttonText}>Pesquisar</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonSecondary]}
          onPress={onOpenFavorites}
        >
          <Text style={styles.buttonText}>{`Meus Favoritos (${favorites.length})`}</Text>
        </Pressable>
      </View>
    </View>
  );
}