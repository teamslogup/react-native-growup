import { combineReducers } from 'redux';
import { userReducer } from '../users/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
