import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { colors, spacing, shadows, typography } from '../utils/theme';

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Here you would typically send the form data to your backend
    Alert.alert(
      'Success',
      'Thank you for your message! We will get back to you soon.',
      [
        {
          text: 'OK',
          onPress: () => {
            setName('');
            setEmail('');
            setMessage('');
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.subtitle}>
            Have questions or suggestions? We'd love to hear from you!
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor={colors.gray}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Your email"
              placeholderTextColor={colors.gray}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.messageInput]}
              value={message}
              onChangeText={setMessage}
              placeholder="Your message"
              placeholderTextColor={colors.gray}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          <CustomButton
            title="Send Message"
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>

        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={24} color={colors.primary} />
            <Text style={styles.contactText}>support@afrostyle.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="logo-instagram" size={24} color={colors.primary} />
            <Text style={styles.contactText}>@afrostyle_app</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.gray,
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    ...shadows.small,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    padding: spacing.sm,
    ...typography.body,
    color: colors.text,
  },
  messageInput: {
    height: 120,
  },
  submitButton: {
    marginTop: spacing.md,
  },
  contactInfo: {
    gap: spacing.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  contactText: {
    ...typography.body,
    color: colors.text,
  },
});

export default ContactScreen; 