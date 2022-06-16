import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRecoilValue } from 'recoil';
import { strings } from '@src/constants';
import {
  CertificationScreen,
  HomeScreen,
  SignInScreen,
  SignUpAgreementScreen,
  SignUpCompleteScreen,
  SignUpPersonalInformationScreen,
  TermsScreen,
} from '@src/screens';
import { userState } from '@src/services/recoil';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
        name={'Home'}
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={'SignIn'}
        component={SignInScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={'SignUpAgreement'}
        component={SignUpAgreementScreen}
        options={{ title: strings.SIGNUP_AGREEMENT }}
      />
      <Stack.Screen
        name={'SignUpPersonalInformation'}
        component={SignUpPersonalInformationScreen}
        options={{ title: strings.SIGNUP_PERSONAL_INFORMATION }}
      />
      <Stack.Screen
        name={'SignUpComplete'}
        component={SignUpCompleteScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={'Certification'}
        component={CertificationScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name={'Terms'} component={TermsScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
