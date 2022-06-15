import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParams = {
  Login: { message: string } | undefined;
  Register: { message: string } | undefined;
  Home: { message: string } | undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParams>;
