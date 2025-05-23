import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, shadows } from '../utils/theme';

const BrandCard = ({ brand, onPress, onFavoritePress, isFavorite }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: brand.imageUrl }}
        style={styles.image}
        defaultSource={require('../../assets/icon.png')}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{brand.name}</Text>
          <TouchableOpacity onPress={onFavoritePress} style={styles.favoriteButton}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? colors.primary : colors.gray}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {brand.description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{brand.country}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{brand.category}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.md,
    ...shadows.medium,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    ...typography.h3,
    color: colors.text,
  },
  favoriteButton: {
    padding: spacing.xs,
  },
  description: {
    ...typography.body,
    color: colors.gray,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  badge: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  badgeText: {
    ...typography.caption,
    color: colors.text,
  },
});

export default BrandCard; 