import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BrandCard from '../components/BrandCard';
import { brands } from '../data/brands';
import { colors, spacing, typography } from '../utils/theme';

const FavoritesScreen = ({ navigation }) => {
  const [favoriteBrands, setFavoriteBrands] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const favoriteIds = JSON.parse(favorites);
        const favoriteBrandsList = brands.filter(brand => favoriteIds.includes(brand.id));
        setFavoriteBrands(favoriteBrandsList);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const handleFavoritePress = async (brandId) => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const favoriteIds = JSON.parse(favorites);
        const newFavorites = favoriteIds.filter(id => id !== brandId);
        await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
        setFavoriteBrands(favoriteBrands.filter(brand => brand.id !== brandId));
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (favoriteBrands.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite brands yet</Text>
        <Text style={styles.emptySubtext}>
          Add brands to your favorites to see them here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteBrands}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BrandCard
            brand={item}
            onPress={() => navigation.navigate('BrandDetail', { brand: item })}
            onFavoritePress={() => handleFavoritePress(item.id)}
            isFavorite={true}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtext: {
    ...typography.body,
    color: colors.gray,
    textAlign: 'center',
  },
});

export default FavoritesScreen; 