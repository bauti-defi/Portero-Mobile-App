import AsyncStorage from '@react-native-community/async-storage';
import {Reducer} from 'redux';
import {persistReducer} from 'redux-persist';
import {LoginAction} from '../actions/login.actions';

export enum AccountType {
  PROPIETARIO = 3,
  GUARDIA = 2,
  USER = 1,
}

export interface UserState {
  email: string;
  fn: string;
  ln: string;
  doc_id: string;
  birth: Date;
  acc_type: AccountType;
}

const initialState: UserState = {
  email: null,
  fn: null,
  ln: null,
  doc_id: null,
  birth: null,
  acc_type: null,
};

const userReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case LoginAction.LOG_IN:
      return {...state, ...action.data.user};
    case LoginAction.LOG_OUT:
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

export default userReducer;
