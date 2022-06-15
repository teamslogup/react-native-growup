// action key
export const USER_DATA = 'user_data';

export interface UserData {
  email: string;
  password: string;
}

// state type
export interface UserDataState {
  userData: UserData | null;
}

// action type
export interface SetUserDataAction {
  type: typeof USER_DATA;
  payload: UserData | null;
}
