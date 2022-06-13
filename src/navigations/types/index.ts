import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
