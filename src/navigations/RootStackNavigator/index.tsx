import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import HomeScreen from '../../screens/HomeScreen';
import { RootStackParams } from '../types';

const Stack = createNativeStackNavigator<RootStackParams>();

const RootStackNavigator = function RootStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Login'}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'Register'}
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
