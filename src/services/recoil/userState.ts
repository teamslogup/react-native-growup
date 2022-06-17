import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'recoil';
import { User } from '@src/data';
import { carpetAxios } from '@src/network/axios';
import { Row } from '@src/network/types';

export const userState = atom<User | null>({
  key: 'user',
  default: (async () => {
    const token = await AsyncStorage.getItem('auth');

    if (!token) return null;

    carpetAxios.interceptors.request.use(req => {
      req.headers = {
        'x-auth-token': JSON.parse(token) as string,
      };

      return req;
    });

    try {
      const res = await carpetAxios.get<Row<{ user: User }>>(
        '/user/sessions/me',
      );

      return res.data.row.user;
    } catch (e) {
      return null;
    }
  })(),
});
