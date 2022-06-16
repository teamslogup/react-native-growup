import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParams = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Agreement: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParams>;
