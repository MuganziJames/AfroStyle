import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../components/CustomButton';
import { colors, spacing, typography, shadows } from '../utils/theme';

const BrandDetailScreen = ({ route, navigation }) => {
  const { brand } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadFavoriteStatus();
  }, []);

  const loadFavoriteStatus = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const favoriteList = JSON.parse(favorites);
        setIsFavorite(favoriteList.includes(brand.id));
      }
    } catch (error) {
      console.error('Error loading favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let favoriteList = favorites ? JSON.parse(favorites) : [];
      
      if (isFavorite) {
        favoriteList = favoriteList.filter(id => id !== brand.id);
      } else {
        favoriteList.push(brand.id);
      }
      
      await AsyncStorage.setItem('favorites', JSON.stringify(favoriteList));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${brand.name} on AfroStyle! ${brand.description}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening link:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: brand.imageUrl }}
          style={styles.image}
          defaultSource={require('../../assets/icon.png')}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={28}
            color={isFavorite ? colors.primary : colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Ionicons name="share-outline" size={28} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{brand.name}</Text>
        
        <View style={styles.badges}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{brand.country}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{brand.category}</Text>
          </View>
        </View>

        <Text style={styles.description}>{brand.longDescription}</Text>

        <View style={styles.socialLinks}>
          <CustomButton
            title="Visit Website"
            onPress={() => openLink(brand.website)}
            variant="outline"
            style={styles.socialButton}
          />
          <CustomButton
            title="Instagram"
            onPress={() => openLink(brand.instagram)}
            variant="outline"
            style={styles.socialButton}
          />
          <CustomButton
            title="WhatsApp"
            onPress={() => openLink(`whatsapp://send?phone=${brand.whatsapp}`)}
            variant="outline"
            style={styles.socialButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: spacing.xs,
  },
  shareButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.xl * 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: spacing.xs,
  },
  content: {
    padding: spacing.lg,
  },
  name: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  badges: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  badge: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  badgeText: {
    ...typography.caption,
    color: colors.text,
  },
  description: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  socialLinks: {
    gap: spacing.md,
  },
  socialButton: {
    width: '100%',
  },
});

export default BrandDetailScreen; 