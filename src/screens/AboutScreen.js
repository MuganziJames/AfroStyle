import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { colors, spacing, typography, shadows } from '../utils/theme';

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>About AfroStyle</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.text}>
          AfroStyle is dedicated to showcasing the rich diversity and creativity of African fashion brands. 
          We aim to connect fashion enthusiasts with exceptional African designers and brands, 
          promoting cultural appreciation and supporting the growth of the African fashion industry.
        </Text>

        <Text style={styles.sectionTitle}>What We Offer</Text>
        <Text style={styles.text}>
          • Curated collection of African fashion brands{'\n'}
          • Detailed brand profiles and stories{'\n'}
          • Direct links to brand websites and social media{'\n'}
          • Easy filtering by country and category{'\n'}
          • Save your favorite brands for quick access
        </Text>

        <Text style={styles.sectionTitle}>Version</Text>
        <Text style={styles.text}>AfroStyle v1.0.0</Text>

        <Text style={styles.sectionTitle}>Contact</Text>
        <Text style={styles.text}>
          Have questions or suggestions?{'\n'}
          Email us at: support@afrostyle.com{'\n'}
          Follow us on Instagram: @afrostyle_app
        </Text>
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
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.white,
    ...shadows.small,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  content: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  text: {
    ...typography.body,
    color: colors.text,
    lineHeight: 24,
  },
});

export default AboutScreen; 