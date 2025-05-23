import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BrandCard from '../components/BrandCard';
import { brands, categories, countries } from '../data/brands';
import { colors, spacing, shadows, typography } from '../utils/theme';

const BrandListScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBrands, setFilteredBrands] = useState(brands);
  const [favorites, setFavorites] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    loadFavorites();
    if (route.params?.filter) {
      setShowFilterModal(true);
    }
  }, []);

  useEffect(() => {
    filterBrands();
  }, [searchQuery, selectedCategory, selectedCountry]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const toggleFavorite = async (brandId) => {
    try {
      const newFavorites = favorites.includes(brandId)
        ? favorites.filter(id => id !== brandId)
        : [...favorites, brandId];
      
      setFavorites(newFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorite:', error);
    }
  };

  const filterBrands = () => {
    let filtered = brands;

    if (searchQuery) {
      filtered = filtered.filter(brand =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(brand => brand.category === selectedCategory);
    }

    if (selectedCountry) {
      filtered = filtered.filter(brand => brand.country === selectedCountry);
    }

    setFilteredBrands(filtered);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedCountry(null);
    setSearchQuery('');
  };

  const renderFilterModal = () => (
    <Modal
      visible={showFilterModal}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Brands</Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <Text style={styles.filterTitle}>Category</Text>
          <View style={styles.filterOptions}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterOption,
                  selectedCategory === category && styles.selectedFilter
                ]}
                onPress={() => setSelectedCategory(
                  selectedCategory === category ? null : category
                )}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedCategory === category && styles.selectedFilterText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.filterTitle}>Country</Text>
          <View style={styles.filterOptions}>
            {countries.map(country => (
              <TouchableOpacity
                key={country}
                style={[
                  styles.filterOption,
                  selectedCountry === country && styles.selectedFilter
                ]}
                onPress={() => setSelectedCountry(
                  selectedCountry === country ? null : country
                )}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedCountry === country && styles.selectedFilterText
                ]}>
                  {country}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearFilters}
          >
            <Text style={styles.clearButtonText}>Clear Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search brands..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Ionicons name="filter" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBrands}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BrandCard
            brand={item}
            onPress={() => navigation.navigate('BrandDetail', { brand: item })}
            onFavoritePress={() => toggleFavorite(item.id)}
            isFavorite={favorites.includes(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      {renderFilterModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    ...shadows.small,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    padding: spacing.xs,
  },
  listContent: {
    padding: spacing.md,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.text,
  },
  filterTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  filterOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
  },
  selectedFilter: {
    backgroundColor: colors.primary,
  },
  filterOptionText: {
    ...typography.caption,
    color: colors.text,
  },
  selectedFilterText: {
    color: colors.white,
  },
  clearButton: {
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  clearButtonText: {
    ...typography.body,
    color: colors.text,
  },
});

export default BrandListScreen; 