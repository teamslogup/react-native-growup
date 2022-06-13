import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRecoilValue } from 'recoil';
import { HomeScreen, SignInScreen } from '@src/screens';
import { userState } from '@src/services/recoil';

const Stack = createNativeStackNavigator();

const RootStackNavigator: React.FC = function RootStackNavigator() {
  const user = useRecoilValue(userState);

  return (
    <Stack.Navigator
      initialRouteName={user ? 'Home' : 'SignIn'}
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
