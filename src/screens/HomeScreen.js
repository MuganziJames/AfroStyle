import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../components/CustomButton';
import { colors, spacing, typography } from '../utils/theme';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.header}
      >
        <Text style={styles.welcomeText}>Welcome to AfroStyle</Text>
        <Text style={styles.subtitle}>Discover African Fashion Excellence</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="All Brands"
            onPress={() => navigation.navigate('Brands')}
            size="large"
            style={styles.button}
          />
          <CustomButton
            title="View by Category"
            onPress={() => navigation.navigate('Brands', { filter: 'category' })}
            variant="secondary"
            size="large"
            style={styles.button}
          />
          <CustomButton
            title="View by Country"
            onPress={() => navigation.navigate('Brands', { filter: 'country' })}
            variant="outline"
            size="large"
            style={styles.button}
          />
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Brands</Text>
          <Text style={styles.sectionDescription}>
            Explore our curated selection of exceptional African fashion brands
          </Text>
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
  header: {
    padding: spacing.xl,
    paddingTop: spacing.xl * 2,
    alignItems: 'center',
  },
  welcomeText: {
    ...typography.h1,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  content: {
    padding: spacing.lg,
  },
  buttonContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  button: {
    width: '100%',
  },
  featuredSection: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  sectionDescription: {
    ...typography.body,
    color: colors.gray,
  },
});

export default HomeScreen; 