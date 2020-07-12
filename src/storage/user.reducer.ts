import AsyncStorage from '@react-native-community/async-storage';
import {Reducer} from 'redux';
import {persistReducer} from 'redux-persist';
import {UserAction} from './storage.actions';

export interface UserState {
  email: string;
  fn: string;
  ln: string;
  doc_id: string;
  birth: Date;
  acc_type: number;
}

const initialState: UserState = {
  email: null,
  fn: null,
  ln: null,
  doc_id: null,
  birth: null,
  acc_type: null,
};

export const userReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case UserAction.LOG_IN:
      return {...state, ...action.data.user};
    case UserAction.LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export default persistedUserReducer;
