import { SignInParams, User } from '@src/data';

const users: User[] = [
  { _id: 1, id: 'mobile@slogup.com', password: '123qwe!' },
];

export const requestSignIn = async ({
  id,
  password,
}: SignInParams): Promise<User | null> => {
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex < 0) return null;

  const user = users[userIndex];

  return user.password === password ? user : null;
};
