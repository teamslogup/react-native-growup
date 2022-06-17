import { AxiosError } from 'axios';
import { User } from '@src/data';
import { carpetAxios } from '@src/network/axios';
import {
  SignInParams,
  SignInSuccessResponse,
  SignInSuccessResult,
  SignUpParams,
  SignUpSuccessResponse,
} from './type';

export const requestSignIn = async ({
  id,
  password,
}: SignInParams): Promise<SignInSuccessResult | null> => {
  try {
    const res = await carpetAxios.post<SignInSuccessResponse>(
      '/user/sessions/me',
      { user_eml_addr: id, pass: password },
    );

    if (!res.headers['x-auth-token']) {
      throw new Error();
    }

    carpetAxios.interceptors.request.use(req => {
      req.headers = { 'x-auth-token': res.headers['x-auth-token'] };

      return req;
    });

    return {
      user: res.data.row.user,
      authToken: res.headers['x-auth-token'],
    };
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
