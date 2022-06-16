import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

export default <T extends keyof RootStackParamList>() =>
  useRoute<RouteProp<RootStackParamList, T>>();
