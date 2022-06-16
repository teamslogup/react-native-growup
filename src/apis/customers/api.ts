import { AxiosError } from 'axios';
import { User } from '@src/data';
import { carpetAxios } from '@src/network/axios';
import {
  SignInParams,
  SignInSuccessResponse,
  SignUpParams,
  SignUpSuccessResponse,
} from './type';

export const requestSignIn = async ({
  id,
  password,
}: SignInParams): Promise<User | null> => {
  try {
    const res = await carpetAxios.post<SignInSuccessResponse>(
      '/user/sessions/me',
      { user_eml_addr: id, pass: password },
    );

    return res.data.row.user;
  } catch (e) {
    return null;
  }
};

export const requestSignUp = async (
  params: SignUpParams,
): Promise<User | string> => {
  try {
    const res = await carpetAxios.post<SignUpSuccessResponse>(
      '/user/signup',
      params,
    );

    return res.data.row.user;
  } catch (e) {
    return (e as AxiosError).message;
  }
};

export const requestSignOut = async (): Promise<string | void> => {
  try {
    return (await carpetAxios.delete<void>('/user/sessions/me')).data;
  } catch (e) {
    return (e as AxiosError).message;
  }
};
