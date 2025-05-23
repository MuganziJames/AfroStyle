import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/utils/theme';

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1, backgroundColor: colors.primary }}>
        <StatusBar style="light" />
        <AppNavigator />
      </View>
    </NavigationContainer>
  );
}
