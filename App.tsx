import { useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { DetailsScreen } from './src/screens/DetailsScreen';
import { FavoritesScreen } from './src/screens/FavoritesScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import { styles } from './src/styles';

function AppNavigator() {
  const [screen, setScreen] = useState('home');
  const [previousScreen, setPreviousScreen] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  function handleSearch(query) {
    setSearchQuery(query);
    setScreen('results');
  }

  function handleOpenFavorites() {
    setScreen('favorites');
  }

  function handleSelectRecipe(recipe, from) {
    setSelectedRecipe(recipe);
    setPreviousScreen(from);
    setScreen('details');
  }

  function handleBackToHome() {
    setScreen('home');
  }

  function handleBackFromDetails() {
    setScreen(previousScreen);
  }

  if (screen === 'results') {
    return (
      <ResultsScreen
        query={searchQuery}
        onSelectRecipe={(recipe) => handleSelectRecipe(recipe, 'results')}
        onBack={handleBackToHome}
        onOpenFavorites={handleOpenFavorites}
      />
    );
  }

  if (screen === 'details' && selectedRecipe) {
    return <DetailsScreen recipe={selectedRecipe} onBack={handleBackFromDetails} />;
  }

  if (screen === 'favorites') {
    return (
      <FavoritesScreen
        onSelectRecipe={(recipe) => handleSelectRecipe(recipe, 'favorites')}
        onBack={handleBackToHome}
      />
    );
  }

  return <HomeScreen onSearch={handleSearch} onOpenFavorites={handleOpenFavorites} />;
}

export default function App() {
  return (
    <FavoritesProvider>
      <View style={styles.appContainer}>
        <StatusBar style="dark" />
        <AppNavigator />
      </View>
    </FavoritesProvider>
  );
}
