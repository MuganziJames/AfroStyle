import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/utils/theme';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={colors.primary} />
      <AppNavigator />
    </NavigationContainer>
  );
}
