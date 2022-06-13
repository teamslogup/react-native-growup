export interface User {
  _id: number;
  id: string;
  password: string;
}

export interface SignInParams {
  id: string;
  password: string;
}
