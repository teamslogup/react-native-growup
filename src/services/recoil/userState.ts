import { atom } from 'recoil';
import { User } from '@src/data';

export const userState = atom<User | null>({
  key: 'user',
  default: null,
});
