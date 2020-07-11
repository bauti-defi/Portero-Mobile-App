import AsyncStorage from '@react-native-community/async-storage';
import {Reducer} from 'redux';
import {createTransform, persistReducer} from 'redux-persist';
import {APP_ACTION, UserAction} from './storage.actions';

export interface UserState {
  token: string;
  email: string;
  fn: string;
  ln: string;
  doc_id: string;
  birth: Date;
  acc_type: number;
}

const initialState: UserState = {
  token: null,
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
      return {...state, ...action.data};
    case APP_ACTION.LOAD:
      console.debug(state);
      if (!!action.token) {
        return {...state, token: action.token};
      }
      return initialState;
    case UserAction.LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

const TransientTokenTransform = createTransform(
  (inboundState: UserState, key) => {
    delete inboundState.token;
    return {...inboundState};
  },
  null,
  {whitelist: ['user']},
);

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
  transforms: [TransientTokenTransform],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export default persistedUserReducer;
