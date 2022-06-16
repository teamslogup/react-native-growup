import { SetUserDataAction, USER_DATA } from '../types';

export const loginUser = (dataToSubmit: {
  email: string;
  password: string;
}): SetUserDataAction => {
  return {
    type: USER_DATA,
    payload: dataToSubmit,
  };
};

export const logoutUser = (): SetUserDataAction => {
  return {
    type: USER_DATA,
    payload: null,
  };
};
