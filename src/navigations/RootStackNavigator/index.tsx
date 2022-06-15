import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRecoilValue } from 'recoil';
import { strings } from '@src/constants';
import {
  HomeScreen,
  SignInScreen,
  SignUpAgreementScreen,
  SignUpCompleteScreen,
  SignUpPersonalInformationScreen,
} from '@src/screens';
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
      {/* SignUp */}
      <Stack.Screen
        name="SignUpAgreement"
        component={SignUpAgreementScreen}
        options={{ title: strings.SIGNUP_AGREEMENT }}
      />
      <Stack.Screen
        name="SignUpPersonalInformation"
        component={SignUpPersonalInformationScreen}
        options={{ title: strings.SIGNUP_PERSONAL_INFORMATION }}
      />
      <Stack.Screen
        name="SignUpComplete"
        component={SignUpCompleteScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
