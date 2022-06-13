import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  SignUpAgreement: undefined;
  SignUpPersonalInformation: undefined;
  SignUpComplete: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
