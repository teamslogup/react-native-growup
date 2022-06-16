import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IMPCertificationResponse, Terms } from '@src/data';

export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  SignUpAgreement: undefined;
  SignUpPersonalInformation: {
    impCertRes: IMPCertificationResponse;
    acceptMarketing: boolean;
  };
  SignUpComplete: undefined;
  Certification: { acceptMarketing: boolean };
  Terms: { terms: Terms };
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
