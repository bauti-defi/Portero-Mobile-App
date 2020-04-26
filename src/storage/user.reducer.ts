import axios from 'axios';
import {Reducer} from 'redux';

export type Cookie = {
  token: string;
  acc_id: string;
  email: string;
  session_id: string;
  type: number;
};

export interface UserState {
  cookie: Cookie;
}

const initialState: UserState = {
  cookie: {
    token: null,
    acc_id: null,
    email: null,
    session_id: null,
    type: null,
  },
};

const userReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case UserAction.STORE_COOKIE:
      axios.defaults.headers.common['Authorization'] = action.cookie.token;
      return {...state, cookie: action.cookie};
    case UserAction.LOG_OUT:
      axios.defaults.headers.common['Authorization'] = '';
      return initialState;
    default:
      return state;
  }
};

export enum UserAction {
  STORE_COOKIE = 'store_cookie',
  LOG_OUT = 'log_out',
}

export default userReducer;
