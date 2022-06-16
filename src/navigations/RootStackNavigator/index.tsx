import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, strings } from '../../constants';
import AgreementScreen from '../../screens/AgreementScreen';
import HomeScreen from '../../screens/HomeScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
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
        options={{
          headerShown: true,
          headerTitle: strings.USER_INFO,
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: '700',
          },
          contentStyle: { backgroundColor: colors.WHITE },
          headerTitleAlign: 'center',
          headerBackTitle: '',
        }}
      />
      <Stack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'Agreement'}
        component={AgreementScreen}
        options={{
          headerShown: true,
          headerTitle: strings.AGREE_TERMS,
          contentStyle: { backgroundColor: colors.WHITE },
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: '700',
          },
          headerTitleAlign: 'center',
          headerBackTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
