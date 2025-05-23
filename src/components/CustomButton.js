import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, shadows } from '../utils/theme';

const CustomButton = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      default:
        return styles.primaryText;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallButton;
      case 'large':
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), getSizeStyle(), style]}
      onPress={onPress}
    >
      <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.small,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  smallButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  mediumButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  largeButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  text: {
    ...typography.body,
    fontWeight: '600',
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.primary,
  },
});

export default CustomButton; 