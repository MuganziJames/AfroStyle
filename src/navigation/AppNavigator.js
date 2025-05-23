import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import BrandListScreen from '../screens/BrandListScreen';
import BrandDetailScreen from '../screens/BrandDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import { colors } from '../utils/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BrandStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="BrandList" 
      component={BrandListScreen}
      options={{ title: 'Discover Brands' }}
    />
    <Stack.Screen 
      name="BrandDetail" 
      component={BrandDetailScreen}
      options={{ title: 'Brand Details' }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Brands') {
            iconName = focused ? 'shirt' : 'shirt-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'About') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          } else if (route.name === 'Contact') {
            iconName = focused ? 'mail' : 'mail-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen 
        name="Brands" 
        component={BrandStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator; 