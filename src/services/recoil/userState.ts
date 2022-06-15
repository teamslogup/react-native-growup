import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'recoil';
import { User } from '@src/data';

export const userState = atom<User | null>({
  key: 'user',
  default: (async () => {
    const userJson = await AsyncStorage.getItem('user');
    const user = userJson ? (JSON.parse(userJson) as User) : null;

    return user;
  })(),
});
