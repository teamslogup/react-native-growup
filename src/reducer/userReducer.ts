import { Reducer } from 'redux';
import { UserDataState, SetUserDataAction, USER_DATA } from '../action/type';

export const loginState: UserDataState = {
  userData: null,
};

export const userReducer: Reducer<UserDataState, SetUserDataAction> = (
  state,
  action,
) => {
  const newState = { ...loginState, ...state };
  switch (action.type) {
    case USER_DATA:
      return { ...newState, userData: action.payload };
    default:
      return newState;
  }
};
